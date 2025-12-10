import readline from "readline-sync";
import { colors } from "./src/util/Colors";
import { CheckingAccount } from "./src/model/CheckingAccount";
import { SavingsAccount } from "./src/model/SavingsAccount";
import { AccountController } from "./src/controller/AccountController";

export function main() {
    let accounts: AccountController = new AccountController();
    let option, accNumber, bankBranch, accountType, balance, limit, anniversary: number;
    let accountHolder: string;
    const accounTypes: string[] = ["Conta Corrente", "Conta Poupança"];


    /* // Test Objects
    
    const checkingAccountTest: CheckingAccount = new CheckingAccount(2, 123, 1, "Mariana", 15000, 1000);
    checkingAccountTest.viewAccount();
    checkingAccountTest.withdraw(2000);
    checkingAccountTest.viewAccount();
    checkingAccountTest.deposit(1000);
    checkingAccountTest.viewAccount();

    const savingsAccountTest: SavingsAccount = new SavingsAccount(3, 123, 2, "Victor", 1000, 10);
    savingsAccountTest.viewAccount();
    savingsAccountTest.withdraw(200);
    savingsAccountTest.viewAccount();
    savingsAccountTest.deposit(1000);
    savingsAccountTest.viewAccount();
 */
    while(true) {
        console.log(colors.bg.black, colors.fg.yellow, "***************************************************************");
        console.log("                                                               ");
        console.log("                    Banco do Brazil com Z                      ");
        console.log("                                                               ");
        console.log("***************************************************************");
        console.log("                                                               ");
        console.log("                 1 - Criar conta                               ");
        console.log("                 2 - Listar todas as Contas                    ");
        console.log("                 3 - Buscar Conta por Número                   ");
        console.log("                 4 - Atualizar Dados da Conta                  ");
        console.log("                 5 - Apagar Conta                              ");
        console.log("                 6 - Sacar                                     ");
        console.log("                 7 - Depositar                                 ");
        console.log("                 8 - Transferir valores entre Contas           ");
        console.log("                 9 - Sair                                      ");
        console.log("                                                               ");
        console.log("***************************************************************", colors.reset);

        option = readline.questionInt("Entre com a opção desejada: ");

        if(option === 9) {
            console.log(colors.fg.greenstrong, "\nBanco do Brazil com Z - O seu futuro começa aqui;");
            console.log("", colors.reset)
            sobre();
            process.exit(0);            
        }

        switch(option) {
            case 1:

                console.log(colors.fg.whitestrong, "\n\nCriar Conta\n\n", colors.reset);
                
                console.log("Digite o número da agência: ")
                bankBranch = readline.questionInt("");
                
                console.log("Digite o nome do titular da conta: ");
                accountHolder = readline.question("");
                
                console.log("Digite o tipo da conta: ");
                accountType = readline.keyInSelect(accounTypes, "", {cancel: false}) + 1;
                
                console.log("Digite o saldo da conta (R$): ");
                balance = readline.questionFloat("");

                switch(accountType) {
                    case 1:
                        console.log("Digite o Limite da Conta (R$): ")
                        limit = readline.questionFloat("");
                        accounts.registerAccount(new CheckingAccount(accounts.generateNumber(), bankBranch, accountType, accountHolder, balance, limit));
                        break;
                    case 2:
                        console.log("Digite o dia do aniversário da Conta Poupança: ");
                        anniversary = readline.questionInt("");
                        accounts.registerAccount(new SavingsAccount(accounts.generateNumber(), bankBranch, accountType, accountHolder, balance, anniversary));
                        break;
                }

                keyPress();
                break;
            case 2:
                console.log(colors.fg.whitestrong, "\n\nListar todas as Contas\n\n", colors.reset);
                accounts.listAllAccounts();
                keyPress();
                break;
            case 3:
                console.log(colors.fg.whitestrong, "\n\nConsultar dados da conta - por número\n\n", colors.reset);
                keyPress();
                break;
            case 4:
                console.log(colors.fg.whitestrong, "\n\nAtualizar dados da Conta\n\n", colors.reset);
                keyPress();
                break;
            case 5:
                console.log("\n\nApagar uma Conta\n\n", colors.reset);
                keyPress();
                break;
            case 6:
                console.log(colors.fg.whitestrong, "\n\nSaque\n\n", colors.reset);
                keyPress();
                break;
            case 7:
                console.log(colors.fg.whitestrong, "\n\nDepósito\n\n", colors.reset);
                keyPress();
                break;
            case 8:
                console.log(colors.fg.whitestrong, "\n\nTransferência entre Contas\n\n", colors.reset);
                keyPress();
                break;
            default:
                console.log(colors.fg.whitestrong, "\n\nOpção inválida!\n\n", colors.reset);
                keyPress();
                break;
        }
    }
}

function sobre(): void {
    console.log("\n***************************************************************");
    console.log("Projeto desenvolvido por: Raylander Ribeiro (rayribeirost)");
    console.log("Generation Brasil - generation@generation.com");
    console.log("github.com/rayribeirost")
    console.log("***************************************************************");

};

function keyPress():void {
    console.log(colors.reset, "");
    console.log("\nPressione enter para continuar...")
    readline.prompt();
};

main();



