import { Account } from "./Account";

export class CheckingAccount extends Account {
    
    private _limit: number;

    constructor (
        accountNumber: number,
        bankBranch: number,
        accountType: number,
        accountHolder: string,
        balance: number,
        limit: number,
    ) {
        super(accountNumber, bankBranch, accountType, accountHolder, balance);
        this._limit = limit;
    };

    // getters
    
    public get limit(): number {
        return this._limit;
    };

    // setters

    public set limit(limit: number) {
        this._limit = limit;
    }

    // methods

    public withdraw(amount: number): boolean {
        if((this.balance + this._limit) < amount) {
            console.log("\n Saldo Insuficiente!");
            return false
        }
        this.balance -= amount;
        return true
    };
    
    public viewAccount(): void {
        super.viewAccount();
        console.log(`Limite ${this._limit.toFixed(2)}`); 
    }
}