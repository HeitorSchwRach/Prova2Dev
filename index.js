const fs = require('fs');
const express = require('express')
const app = express()
const porta = 8000


function adicionarArquivo(Name){
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
app.get('/', (req, res) => {
    res.send(adicionarArquivo);
});
app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
});