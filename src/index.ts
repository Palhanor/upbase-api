import dotenv from "dotenv";
import express, { type Request, type Response } from "express";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
    res.send("Inicializando o Desafio UpBase!");
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
