import { Account } from "../model/Account";

export interface AccountRepository {

    // Account CRUD
    findAccountNumber(accNumber: number): void;
    listAllAccounts(): void;
    registerAccount(account: Account): void;
    updateAccount(account: Account): void;
    deleteAccount(accNumber: number): void;

    // Bank Methods
    withdraw(accNumber: number, amount: number): void;
    deposit(accNumber: number, amount: number): void;
    transfer(accNumberOrigin: number, accNumberDest: number, amount: number): void;
}