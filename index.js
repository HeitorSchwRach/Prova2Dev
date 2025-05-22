const fs = require("fs");
const express = require("express");
const app = express();
const porta = 8000;
const uuid = require("uuid");
app.use(express.json());

async function readData() {
  try {
    const data = await fs.promises.readFile("logs.txt", "utf8");
    return data;
  } catch (err) {
    return { error: err.mensage };
  }
}
async function writeData(data) {
  try {
    await fs.promises.appendFile("logs.txt", data);
  } catch (err) {
    return { error: err.mensage };
  }
}

function adicionarLog(nome) {
  const date = new Date().toUTCString();
  const log = `${nome} - ${date} - ${uuid.v4()}\n`;
  writeData(log)
}

app.get("/logs", async (req, res) => {
  try {
    const logs = await readData();
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: logs.error });
  }
});
app.post("/logs", express.json(), async (req, res) => {
  const name = req.body.name;
  if (!name) {
    return res.status(400).json({ error: "Nome não fornecido" });
  }
    try {
        adicionarLog(name)
        res.status(201).json({ message: "Log adicionado com sucesso" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

app.get("/logs", async (req, res) => {
    const logs = await readData();
    if (logs.error) {
        res.status(500).json({ error: logs.error });
    } else {
        const logsArray = logs.split("\n").filter((log) => log.trim() !== "");
        res.json(logsArray);
    }
})

app.get("/logs/:id", async (req, res) => {
    const logs = await readData();
    if (logs.error) {
        res.status(500).json({ error: logs.error });
    } else {
        const logsArray = logs.split("\n").filter((log) => log.trim() !== "");
        const log = logsArray.find((log) => log.includes(req.params.id));
        if (log) {
            res.json(log);
        } else {
            res.status(404).json({ error: "Log não encontrado" });
        }
    }
})

app.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}`);
})