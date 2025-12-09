import { Account } from "./Account";

export class CheckingAccount extends Account {
    
    private _anniversary: number;

    constructor (
        accountNumber: number,
        bankBranch: number,
        accountType: number,
        accountHolder: string,
        balance: number,
        anniversary: number,
    ) {
        super(accountNumber, bankBranch, accountType, accountHolder, balance);
        this._anniversary = anniversary;
    };

    // getters
    
    public get anniversary(): number {
        return this._anniversary;
    };

    // setters

    public set anniversary(limit: number) {
        this._anniversary = limit;
    }

    // methods

    public viewAccount(): void {
        super.viewAccount();
        console.log(`Dia do aniversário: ${this._anniversary.toFixed(2)}`); 
    }
}