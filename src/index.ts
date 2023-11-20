import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import swaggerUI from "swagger-ui-express";
import { createUser, getUsers } from "./controller/UserController";
import swaggerDocument from "./swagger.json";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.get("/v1/api/users", getUsers);
app.post("/v1/api/users", createUser);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API rodando no endereço http://localhost:${PORT}`);
});