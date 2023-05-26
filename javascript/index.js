

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
                
            }
        });
    };
};

