import { Account } from "../model/Account";
import { AccountRepository } from "../repository/AccountRepository";
import { colors } from "../util/Colors";

export class AccountController implements AccountRepository {

    private accountList: Array<Account> = new Array<Account>();
    lastAccountNumber: number = 0;
    
    // Methods
    findAccountNumber(accNumber: number): void {
        let searchAccount = this.searchInCollection(accNumber);
        searchAccount != null ? searchAccount.viewAccount() : console.log(colors.fg.red, `\nA conta numero: ${accNumber} não foi encontrada!`, colors.reset);
    }
    listAllAccounts(): void {
        this.accountList.forEach((account : Account) => account.viewAccount());
    }
    registerAccount(account: Account): void {
        this.accountList.push(account);
        console.log(colors.fg.green, `\nA conta número ${account.accountNumber} foi criada com sucesso!`, colors.reset);
    }
    updateAccount(account: Account): void {
        let searchAccount = this.searchInCollection(account.accountNumber);
        if (searchAccount != null) {
            this.accountList[this.accountList.indexOf(searchAccount)] = account;
            console.log(colors.fg.green, `\nA conta número: ${account.accountNumber} foi atualizada com sucesso!`, colors.reset);
        } else console.log(colors.fg.red, `\nA conta número: ${account.accountNumber} não foi encontrada!`, colors.reset);
    }
    deleteAccount(accNumber: number): void {
        let searchAccount = this.searchInCollection(accNumber);
        if (searchAccount != null) {
            this.accountList.splice(this.accountList.indexOf(searchAccount), 1);
            console.log(colors.fg.green, `\nA conta número: ${accNumber} foi apagada com sucesso!`, colors.reset);
        } else console.log(colors.fg.red, `\nA conta número: ${accNumber} não foi encontrada!`, colors.reset); 
    }
    withdraw(accNumber: number, amount: number): void {
        let account = this.searchInCollection(accNumber);
        if (account != null) if(account.withdraw(amount) == true) console.log(colors.fg.green, `\nO saque na conta ${accNumber} foi efetuado com sucesso`, colors.reset);
        else console.log(colors.fg.red, `\nA conta número: ${accNumber} não foi encontrada!`, colors.reset);
    }
    deposit(accNumber: number, amount: number): void {
        let account = this.searchInCollection(accNumber);
        if (account != null) {
            account.deposit(amount);
            console.log(colors.fg.green, `\nO depósito na conta número: ${accNumber} foi efetuado com sucesso!`);
        } else console.log(colors.fg.red, `\nA conta número: ${accNumber} não foi encontrada!`);
    }
    transfer(accNumberOrigin: number, accNumberDest: number, amount: number): void {
        let accOrigin = this.searchInCollection(accNumberOrigin);
        let accDest = this.searchInCollection(accNumberDest);
        if(accOrigin != null && accDest != null) {
            if(accOrigin.withdraw(amount) == true) {
                accDest.deposit(amount);
                console.log(colors.fg.green, `\nA transferência da conta número: ${accNumberOrigin} para a conta número: ${accNumberDest} foi efetuada com sucesso!`);
            }
        } else console.log(colors.fg.red, `\nA conta número: ${accNumberOrigin} e/ou a conta número: ${accNumberDest} não foram encontradas!`);
    }
    generateNumber(): number {
        return ++this.lastAccountNumber;
    }
    searchInCollection(accNumber: number): Account | null {
        let findAccount: Account | undefined = this.accountList.find((acc : Account) => acc.accountNumber === accNumber);
        return findAccount ? findAccount : null;
    }
}