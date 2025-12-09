export abstract class Account {

    private _accountNumber: number;
    private _bankBranch: number;
    private _accountType: number;
    private _accountHolder: string;
    private _balance: number;

    constructor(
        accountNumber: number,
        bankBranch: number,
        accountType: number,
        accountHolder: string,
        balance: number,
    ) {
        this._accountNumber = accountNumber;
        this._bankBranch = bankBranch;
        this._accountType = accountType;
        this._accountHolder = accountHolder;
        this._balance = balance;
    }

    //getters

    public get accountNumber(): number {
        return this._accountNumber;
    };

    public get bankBranch(): number {
        return this._bankBranch;
    };

    public get accountType(): number {
        return this._accountType;
    };

    public get accountHolder(): string {
        return this._accountHolder;
    };

    public get balance(): number {
        return this._balance;
    };

    //setters

    public set accountNumber(accountNumber : number) {
        this._accountNumber = accountNumber;
    };

    public set bankBranch(bankBranch: number) {
        this._bankBranch = bankBranch;
    };

    public set accountType(accountType: number) {
        this._accountType = accountType;
    };

    public set accountHolder(accountHolder: string) {
        this._accountHolder = accountHolder;
    };

    public set balance(balance: number) {
        this._balance = balance;
    };   

    //methods

    public withdraw(amount: number): boolean {
        if(this._balance < amount) {
            console.log("\n Saldo Insuficiente!");
            return false;
        };
        this._balance -= amount;
        return true;
    };

    public deposit(amount: number): void {
        this._balance += amount;
    };

    public viewAccount(): void {
        let accountType: string = "";
        switch(this._accountType) {
            case 1:
                accountType = "Conta Corrente";
                break;
            case 2: 
                accountType = "Conta Poupança";
                break;
        };
        console.log("\n\n******************************************************");
        console.log("Dados da Conta:");
        console.log("******************************************************");
        console.log(`Número da Conta: ${this._accountNumber}`);
        console.log(`Agência: ${this._bankBranch}`);
        console.log(`Tipo da Conta: ${accountType}`);
        console.log(`Titular: ${this._accountHolder}`);
        console.log(`Saldo: $${this._balance.toFixed(2)}`);
    };


}