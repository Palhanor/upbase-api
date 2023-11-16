import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { createUser } from "./controller/UserController";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.post("/v1/api/user", createUser);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API rodando no endereço http://localhost:${PORT}`);
});