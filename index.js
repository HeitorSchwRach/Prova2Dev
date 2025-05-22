const fs = require('fs');
const express = require('express');
const { error } = require('console');
const app = express()
const porta = 8000

async function readData() {
    try{
        const data = await fs.promises.readFile('logs.txt', 'utf8');
    return data;
} catch (err) {
    return{error:err.mensage}
}
}

async function writeData(data) {
    try{
        await fs.appendFile('logs.txt', data);
    } catch (err) {
        return{error:err.mensage}
    }
}


function adicionarArquivo(Name){
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

fs.writeFileSync('logs.txt', '', (err) => {
    if (err) {
        console.error("Erro ao criar o arquivo:", err);
    } else {
        console.log("Arquivo criado com sucesso!");
    }
});

app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
});
app.use(express.json());

app.get('/logs', async (req, res) => {
    const logs = await readData();
    if (logs.error) {
        res.status(500).json({ error: logs.error });
    } else {
        res.json(logs);
    }
});
app.post('/logs', async (req, res) => {
    const { nome } = req.body;
    const logs = await writeData(nome);
    if (logs.error) {
        res.status(500).json({ error: logs.error });
    } else {
        res.json(logs);
    }
});

app.get('/logs/:id', async (req, res) => {
    const id = req.params.id;
    const logs = await readData();
    if (logs.error) {
        res.status(500).json({ error: logs.error });
    } else {
        const log = logs.find(log => log.id === id);
        if (log) {
            res.json(log);
            console.log('ID encontrado:', id);
        } else {
            res.status(404).json({ error: 'Id não encontrado' });
        }
    }
});