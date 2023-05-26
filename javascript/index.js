var Q200 = [
    {
        "indice": "Q200",
        "data": "01010001",
        "entrada": "000",
        "saida": "000",
        "saldo": "000",
    }
]

const table_q200 = document.querySelector('.table-q200')

function handleFile(files){
    const reader = new FileReader();
    // Lê o arquivo
    reader.readAsText(files[0]);
    // Pega o arquivo ao carregá-lo
    reader.onload = (event) => {
        const data = event.target.result;
        const lines = data.split("\n");

        lines.forEach(line => {
            let arrayLine = line.split("|");
            if (arrayLine[0] == "Q200") {
                let novo_q200 = {
                    "indice": arrayLine[0],
                    "data": arrayLine[1],
                    "entrada": arrayLine[2],
                    "saida": arrayLine[3],
                    "saldo": arrayLine[4],
                }
                Q200.push(novo_q200);
            }
        });

        Q200.shift();
        console.log(Q200);
    };
};

