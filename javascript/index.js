var Q200 = [
    {
        "indice": "Q200",
        "data": "01010001",
        "entrada": "000",
        "saida": "000",
        "saldo": "000",
    }
]

//const table_q200 = document.querySelector('.table-q200')
const table_q200 = document.createElement('table');
table_q200.classList.add('table-q200');
const q200_headers = [
    "Código",
    "Data",
    "Entrada",
    "Saída",
    "Saldo",
];

function createHeadersTable(table, headers) {
    //table.innerHTML = '<table><tr>';
    const tr = document.createElement('tr');
    headers.forEach(header => {
        let th = document.createElement('th');
        th.innerHTML = header;
        tr.appendChild(th);
    });
    table.appendChild(tr);
}

function handleFile(files){
    createHeadersTable(table_q200, q200_headers);
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
                table_q200.innerHTML += `<tr>
                                            <td>${arrayLine[0]}</td>
                                            <td>${formatDate(arrayLine[1])}</td>
                                            <td>${formatMoney(arrayLine[2])}</td>
                                            <td>${formatMoney(arrayLine[3])}</td>
                                            <td>${formatMoney(arrayLine[4])}</td>
                                        </tr>`;
            }
        });

        Q200.shift();
        conteudos[3].innerHTML = "";
        conteudos[3].appendChild(table_q200);
        //console.log(Q200);
    };
};

function formatDate(value) {
    return `${value.slice(0,2)}/${value.slice(2)}`;
}

function formatMoney(value) {
    let insertDot = `${value.slice(0,value.length - 2)}.${value.slice(-2)}`;
    let parseNumber = Number(insertDot);
    return  parseNumber.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
}

/* Abas */

const abas = document.querySelectorAll('.aba');
const conteudos = document.querySelectorAll('.conteudo');

conteudos[0].style.display = 'flex';

abas.forEach(aba => {
    aba.addEventListener('click', () => {
        clickAba(Number(aba.getAttribute('data-index')));
    });
});

function clickAba(index) {
    for (let i = 0; i < conteudos.length; i++) {
        conteudos[i].style.display = 'none';
        abas[i].classList.remove('selected');
    }
    conteudos[index].style.display = 'flex';
    abas[index].classList.add('selected');
}