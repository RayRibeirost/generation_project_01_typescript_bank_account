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
        let account = this.searchInCollection(accNumber);
        if (account != null) {
            if(account.withdraw(amount) == true) console.log(colors.fg.green, `\nO saque na conta ${accNumber} foi efetuado com sucesso`, colors.reset);
        } else {
            console.log(colors.fg.red, `\nA conta número: ${accNumber} não foi encontrada!`, colors.reset);
        }
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