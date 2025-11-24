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

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export default class GatewayController {

  /**
   * @swagger
   * /accounts:
   *   post:
   *     summary: Cria uma nova conta
   *     tags: [Accounts]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateAccountRequest'
   *     responses:
   *       201:
   *         description: Conta criada com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 account:
   *                   $ref: '#/components/schemas/Account'
   *                 _links:
   *                   type: object
   */
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

  /**
   * @swagger
   * /accounts:
   *   get:
   *     summary: Lista todas as contas
   *     tags: [Accounts]
   *     responses:
   *       200:
   *         description: Lista de contas retornada com sucesso
   */
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

  /**
   * @swagger
   * /accounts/{id}:
   *   get:
   *     summary: Obtém os dados de uma conta específica
   *     tags: [Accounts]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Dados da conta
   *       404:
   *         description: Conta não encontrada
   */
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

  /**
   * @swagger
   * /accounts/{id}:
   *   put:
   *     summary: Atualiza os dados de uma conta específica
   *     tags: [Accounts]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateAccountRequest'
   *     responses:
   *       200:
   *         description: Conta atualizada com sucesso
   *       404:
   *         description: Conta não encontrada
   */
  static async updateAccount(req: Request, res: Response) {
    try {
      const id = req.params.id as string;  
      const result = await restProxy.updateAccount(id, req.body);
      res.json(result);
    } catch (err: any) {
      res.status(err.response?.status || 500).json({ error: err.message });
    }
  }

  /**
   * @swagger
   * /accounts/{id}:
   *   delete:
   *     summary: Deleta uma conta específica
   *     tags: [Accounts]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       204:
   *         description: Conta deletada com sucesso
   *       404:
   *         description: Conta não encontrada
   */
  static async deleteAccount(req: Request, res: Response) {
    try {
      const id = req.params.id as string;  
      await restProxy.deleteAccount(id);
      res.status(204).send();
    } catch (err: any) {
      res.status(err.response?.status || 500).json({ error: err.message });
    }
  }

  /**
   * @swagger
   * /accounts/{id}/deposit:
   *   post:
   *     summary: Realiza um depósito em uma conta
   *     tags: [Accounts]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/DepositRequest'
   *     responses:
   *       200:
   *         description: Depósito realizado com sucesso
   */
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

  /**
   * @swagger
   * /files:
   *   post:
   *     summary: Faz upload de um arquivo via SOAP
   *     tags: [Files]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UploadFileRequest'
   *     responses:
   *       201:
   *         description: Arquivo enviado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 fileId:
   *                   type: string
   *                 _links:
   *                   type: object
   */
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

  /**
   * @swagger
   * /files/{id}:
   *   get:
   *     summary: Obtém informações de um arquivo via SOAP
   *     tags: [Files]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Informações do arquivo retornadas com sucesso
   */
  static async getFileInfo(req: Request, res: Response) {
    try {
      const { id } = req.params as { id: string };
      console.log("Buscando informações do arquivo:", id);
      
      const fileInfo = await soapService.getFileInfo(id);
      
      // Verifica se o arquivo existe
      if (!fileInfo.exists) {
        return res.status(404).json({ 
          error: "Arquivo não encontrado",
          fileId: id 
        });
      }

      res.json({
        id: fileInfo.id,
        filename: fileInfo.filename,
        size: fileInfo.size,
        sizeFormatted: formatBytes(fileInfo.size),
        uploadedAt: new Date(fileInfo.uploadedAt).toISOString(),
        exists: fileInfo.exists,
        _links: makeFileLinks(id)
      });
    } catch (err: any) {
      console.error("Erro ao buscar arquivo via gateway:", err);
      res.status(500).json({ error: err.message });
    }
  }
}
