import { Account } from "../model/Account";
import { AccountRepository } from "../repository/AccountRepository";
import { colors } from "../util/Colors";

export class AccountController implements AccountRepository {

    private accountList: Array<Account> = new Array<Account>();
    lastAccountNumber: number = 0;
    
    // Methods
    findAccountNumber(accNumber: number): void {
        throw new Error("Method not implemented.");
    }
    listAllAccounts(): void {
        this.accountList.forEach(account => account.viewAccount());
    }
    registerAccount(account: Account): void {
        this.accountList.push(account);
        console.log(colors.fg.green, `\nA conta número ${account.accountNumber} foi criada com sucesso!`, colors.reset);
    }
    updateAccount(account: Account): void {
        throw new Error("Method not implemented.");
    }
    deleteAccount(accNumber: number): void {
        throw new Error("Method not implemented.");
    }
    withdraw(accNumber: number, amount: number): void {
        throw new Error("Method not implemented.");
    }
    deposit(accNumber: number, amount: number): void {
        throw new Error("Method not implemented.");
    }
    transfer(accNumberOrigin: number, accNumberDest: number, amount: number): void {
        throw new Error("Method not implemented.");
    }
    generateNumber(): number {
        return ++this.lastAccountNumber;
    }
    searchInCollection(accNumber: number): Account | void {
        
    }
}