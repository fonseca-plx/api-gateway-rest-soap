import { Request, Response } from "express";
import restProxy from "../services/restProxyService";
import soapService from "../services/soapService";

const makeAccountLinks = (id?: string) => {
  if (!id) {
    return {
      create: { href: `/api/accounts`, method: "POST" },
      list: { href: `/api/accounts`, method: "GET" }
    };
  }

  return {
    self: { href: `/api/accounts/${id}`, method: "GET" },
    update: { href: `/api/accounts/${id}`, method: "PUT" },
    delete: { href: `/api/accounts/${id}`, method: "DELETE" },
    deposit: { href: `/api/accounts/${id}/deposit`, method: "POST" }
  };
};

const makeFileLinks = (id?: string) => {
  if (!id) {
    return {
      upload: { href: `/api/files`, method: "POST" }
    };
  }
  return {
    self: { href: `/api/files/${id}`, method: "GET" }
  };
};

export default class GatewayController {

  // ---------- Accounts ----------
  static async createAccount(req: Request, res: Response) {
    try {
      const result = await restProxy.createAccount(req.body);
      // espera-se que a API interna já retorne _links; reforçamos aqui
      const acc = result.account ?? result;
      res.status(201).json({
        account: acc,
        _links: makeAccountLinks(acc.id)
      });
    } catch (err: any) {
      res.status(err.response?.status || 500).json({ error: err.message });
    }
  }

  static async getAccounts(req: Request, res: Response) {
    try {
      const result = await restProxy.getAllAccounts();
      // adicionar links por recurso (simplificado)
      const data = Array.isArray(result)
        ? result.map((r: any) => ({ ...r, _links: makeAccountLinks(r.id) }))
        : result;
      res.json(data);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getAccountById(req: Request, res: Response) {
    try {
      const id = req.params.id as string;  
      const result = await restProxy.getAccount(id);
      const acc = result.account ?? result;
      res.json({ account: acc, _links: makeAccountLinks(acc.id) });
    } catch (err: any) {
      res.status(err.response?.status || 500).json({ error: err.message });
    }
  }

  static async updateAccount(req: Request, res: Response) {
    try {
      const id = req.params.id as string;  
      const result = await restProxy.updateAccount(id, req.body);
      res.json(result);
    } catch (err: any) {
      res.status(err.response?.status || 500).json({ error: err.message });
    }
  }

  static async deleteAccount(req: Request, res: Response) {
    try {
      const id = req.params.id as string;  
      await restProxy.deleteAccount(id);
      res.status(204).send();
    } catch (err: any) {
      res.status(err.response?.status || 500).json({ error: err.message });
    }
  }

  static async deposit(req: Request, res: Response) {
    try {
      const id = req.params.id as string;  
      const result = await restProxy.deposit(id, req.body);
      const acc = result.account ?? result;
      res.json({
        message: "Depósito via Gateway realizado com sucesso",
        account: acc,
        _links: makeAccountLinks(acc.id)
      });
    } catch (err: any) {
      res.status(err.response?.status || 500).json({ error: err.message });
    }
  }

  // ---------- Files (SOAP) ----------
  static async uploadFile(req: Request, res: Response) {
    try {
      const { filename, contentBase64 } = req.body;
      console.log("Upload request:", { filename, contentLength: contentBase64?.length });
      
      if (!filename || !contentBase64) {
        return res.status(400).json({ error: "filename e contentBase64 são obrigatórios" });
      }
      
      const fileId = await soapService.uploadFile(filename, contentBase64);
      console.log("Upload successful, fileId:", fileId);
      
      const id = typeof fileId === "object" && fileId.return ? fileId.return : fileId;
      res.status(201).json({
        fileId: id,
        _links: makeFileLinks(id)
      });
    } catch (err: any) {
      console.error("Erro no upload via gateway:", err);
      res.status(500).json({ error: err.message });
    }
  }

  static async getFileInfo(req: Request, res: Response) {
    try {
      const id = req.params.id as string;  
      const result = await soapService.getFileInfo(id);
      res.json({
        fileInfo: result,
        _links: makeFileLinks(req.params.id)
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
}
