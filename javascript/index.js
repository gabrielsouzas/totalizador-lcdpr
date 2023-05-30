/* TABELAS e THEADERS */

const table_q200 = createTable();
const q200_headers = [
    "Código",
    "Data",
    "Entrada",
    "Saída",
    "Saldo",
];

const table_0030 = createTable();
const headers_0030 = [
    "REG",
    "ENDERECO",
    "NUM",
    "COMPL",
    "BAIRRO",
    "UF",
    "COD_MUN",
    "CEP",
    "NUM_TEL",
    "EMAIL",
];

const table_0040 = createTable();
const headers_0040 = [
    "REG",
    "COD_IMÓVEL",
    "PAIS",
    "MOEDA",
    "CAD_ITR",
    "CAEPF",
    "INSCR_ESTADUAL",
    "NOME_IMÓVEL",
    "ENDERECO",
    "NUM",
    "COMPL",
    "BAIRRO",
    "UF",
    "COD_MUN",
    "CEP",
    "TIPO_EXPLORAÇÃO",
    "PARTICIPAÇÃO",
];

const table_q100 = createTable();
const headers_q100 = [
    "REG",
    "DATA",
    "COD_IMÓVEL",
    "COD_CONTA",
    "NUM_DOC",
    "TIPO_DOC",
    "HIST",
    "ID_PARTIC",
    "TIPO_LANC",
    "VL_ENTRADA",
    "VL_SAIDA",
    "SLD_FIN",
    "NAT_SLD_FIN",
];

function createTable(className=''){
    let table = document.createElement('table');
    if (className) {
        table.classList.add(className);
    }
    return table;
}

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

/* FUNÇÂO PRINCIPAL DO TRATAMENTO DO ARQUIVO */
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
            preencherTabelas(table_q200, arrayLine);
            
        });

        //Q200.shift();
        conteudos[3].innerHTML = "";
        conteudos[3].appendChild(table_q200);
        conteudos[3].style.alignItems = 'flex-start';
        //console.log(Q200);
    };
};

/* PREENCHIMENTO DAS TABELAS DE ACORDO COM O TIPO DE REGISTRO */
function preencherTabelas(tabela, dados) {
    if (dados[0] == "Q200") {
        tabela.innerHTML += `<tr>
                                    <td>${dados[0]}</td>
                                    <td>${formatDate(dados[1])}</td>
                                    <td>${formatMoney(dados[2])}</td>
                                    <td>${formatMoney(dados[3])}</td>
                                    <td>${formatMoney(dados[4])}</td>
                                </tr>`;
    }
}

function formatDate(value) {
    return `${value.slice(0,2)}/${value.slice(2)}`;
}

function formatMoney(value) {
    let insertDot = `${value.slice(0,value.length - 2)}.${value.slice(-2)}`;
    let parseNumber = Number(insertDot);
    return  parseNumber.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
}

/* CONTROLE DAS ABAS */

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