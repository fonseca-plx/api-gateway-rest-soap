import { accounts } from "../data/database";
import { Account } from "../models/Account";

export class AccountService {

  createAccount(nome: string, cpf: string): Account {
    const id = Date.now().toString();

    const newAccount: Account = {
      id,
      nome,
      cpf,
      saldo: 0
    };

    accounts.push(newAccount);
    return newAccount;
  }

  getAll() {
    return accounts;
  }

  getById(id: string) {
    return accounts.find(acc => acc.id === id);
  }

  update(id: string, data: Partial<Omit<Account, "id" | "saldo">>) {
    const account = this.getById(id);
    if (!account) return null;

    account.nome = data.nome ?? account.nome;
    account.cpf = data.cpf ?? account.cpf;

    return account;
  }

  delete(id: string) {
    const index = accounts.findIndex(acc => acc.id === id);
    if (index === -1) return false;

    accounts.splice(index, 1);
    return true;
  }

  deposit(id: string, amount: number) {
    const account = this.getById(id);
    if (!account) return null;

    account.saldo += amount;
    return account;
  }

}
