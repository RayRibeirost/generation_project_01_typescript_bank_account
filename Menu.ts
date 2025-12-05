import readline from "readline-sync";

export function main() {
    let option: number;
    while(true) {
        console.log("***************************************************************");
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
        console.log("***************************************************************");

        option = readline.questionInt("Entre com a opção desejada: ");

        if(option === 9) {
            console.log("\nBanco do Brazil com Z - O seu futuro começa aqui;");
            sobre();
            process.exit(0);            
        }

        switch(option) {
            case 1:
                console.log("\n\nCriar Conta\n\n");
                break;
            case 2:
                console.log("\n\nListar todas as Contas\n\n");
                break;
            case 3:
                console.log("\n\nConsultar dados da conta - por número\n\n");
                break;
            case 4:
                console.log("\n\nAtualizar dados da Conta\n\n");
                break;
            case 5:
                console.log("\n\nApagar uma Conta\n\n");
                break;
            case 6:
                console.log("\n\nSaque\n\n");
                break;
            case 7:
                console.log("\n\nDepósito\n\n");
                break;
            case 8:
                console.log("\n\nTransferência entre Contas\n\n");
                break;
            default:
                console.log("\n\nOpção inválida!\n\n");
                break;
        }
    }
}

export function sobre(): void {
    console.log("\n***************************************************************");
    console.log("Projeto desenvolvido por: Raylander Ribeiro (rayribeirost)");
    console.log("Generation Brasil - generation@generation.com");
    console.log("github.com/rayribeirost")
    console.log("***************************************************************");

}

main();



