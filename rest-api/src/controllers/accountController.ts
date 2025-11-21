import { Request, Response } from "express";
import { AccountService } from "../services/accountService";

const service = new AccountService();

export class AccountController {

  static create(req: Request, res: Response) {
    const { nome, cpf } = req.body;
    
    if (!nome || !cpf) {
      return res.status(400).json({ error: "Nome e CPF são obrigatórios" });
    }
    
    const acc = service.createAccount(nome, cpf);

    res.status(201).json({
      account: acc,
      _links: {
        self: { href: `/accounts/${acc.id}` },
        deposit: { href: `/accounts/${acc.id}/deposit`, method: "POST" }
      }
    });
  }

  static getAll(req: Request, res: Response) {
    res.json(service.getAll());
  }

  static getById(req: Request, res: Response) {
    const id = req.params.id as string;
    const acc = service.getById(id);
    if (!acc) return res.status(404).json({ error: "Conta não encontrada" });

    res.json({
      account: acc,
      _links: {
        self: { href: `/accounts/${acc.id}` },
        deposit: { href: `/accounts/${acc.id}/deposit`, method: "POST" }
      }
    });
  }

  static update(req: Request, res: Response) {
    const id = req.params.id as string;
    const acc = service.update(id, req.body);
    if (!acc) return res.status(404).json({ error: "Conta não encontrada" });

    res.json(acc);
  }

  static delete(req: Request, res: Response) {
    const id = req.params.id as string;
    const deleted = service.delete(id);
    if (!deleted) return res.status(404).json({ error: "Conta não encontrada" });

    res.status(204).send();
  }

  static deposit(req: Request, res: Response) {
    const id = req.params.id as string;
    const { amount } = req.body;
    
    if (!amount || typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({ error: "Valor de depósito inválido" });
    }
    
    const acc = service.deposit(id, amount);

    if (!acc) return res.status(404).json({ error: "Conta não encontrada" });

    res.json({
      message: "Depósito realizado com sucesso",
      account: acc,
      _links: {
        self: { href: `/accounts/${acc.id}` },
        deposit: { href: `/accounts/${acc.id}/deposit`, method: "POST" }
      }
    });
  }

}
