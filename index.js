function adicionarArquivo(Name){
    const fs = require('fs');
    const logs = "logs.txt";
    const data = new Date.parse();
    const idUnico = data.getTime();
    let nome = new Name(nome);
    const conteudo = `ID: ${idUnico}, Data: ${data}\n, Nome: ${nome}`;
    fs.appendFile(logs, conteudo, (err) => {
        if (err) {
            console.error("Erro ao adicionar o arquivo:", err);
        } else {
            console.log("Arquivo adicionado com sucesso!");
        }
    });
}

class Name{
    constructor(nome){
        this.nome = nome;
    }
}

fs.writeFileSync('logs.txt', adicionarArquivo);

