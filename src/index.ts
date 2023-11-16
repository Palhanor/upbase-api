import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { ZodError, z } from "zod";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;
const prisma = new PrismaClient();

const userSchema = z.object({
    name: z.string()
        .min(2, { message: "Nome deve ter no mínimo 2 caracteres" })
        .max(127, { message: "Nome deve ter no máximo 127 caracteres" }),
    username: z.string()
        .min(3, { message: "Username deve ter no mínimo 3 caracteres" })
        .max(127, { message: "Username deve ter no máximo 127 caracteres" }),
    email: z.string()
        .email({ message: "O e-mail informado deve estar em um formato válido" }),
    password: z.string()
        .min(8, { message: "Senha deve ter no mínimo 8 caracteres" })
        .max(63, { message: "Senha deve ter no máximo 63 caracteres" }),
    passwordConfirmation: z.string()
        .min(8, { message: "Senha deve ter no mínimo 8 caracteres" })
        .max(63, { message: "Senha deve ter no máximo 63 caracteres" }),
    student: z.boolean(),
    teacher: z.boolean(),
});

app.post("/v1/api/user", async (req: Request, res: Response) => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,63}$/;
    try {
        const body = userSchema.parse(req.body);

        const existingUsername = await prisma.user.findUnique({
            where: { username: body.username },
        });

        if (existingUsername) {
            return res.status(400).json({ error: "O nome de usuário informado já está em uso" });
        }
  
        const existingEmail = await prisma.user.findUnique({
            where: { email: body.email },
        });

        if (existingEmail) {
            return res.status(400).json({ error: "O endereço de e-mail informado já está em uso" });
        }

        if (body.password !== body.passwordConfirmation) {
            return res.status(404).json({error: "As senhas informadas não coincidem"});
        }
          
        if (!passwordPattern.test(body.password)) {
            return res.status(404).json({error: "A senha deve conter ao menos uma letra minúscula, uma maiúscula, e um dígito numérico"});
        }
          
        if (body.student && body.teacher || !body.student && !body.teacher) {
            return res.status(404).json({error: "O novo usuário deve ser um estudante ou um professor"});
        }

        const hashedPassword = await bcrypt.hash(body.password, 10);
        const user = await prisma.user.create({
            data: {
                name: body.name,
                username: body.username,
                email: body.email,
                password: hashedPassword,
                student: body.student,
                teacher: body.teacher,
            },
            select: {
                id: true,
                name: true,
                username: true,
                email: true,
                password: false,
                student: true,
                teacher: true,
                createdAt: true,
            },
        });

        return res.status(201).json(user);
    } catch (error) {
        if (error instanceof ZodError) {
            console.log(error);
            return res.status(404).json({error: error.errors[0].message});
        }
        return res.status(500).json({error: "Internal Error!"});
    }    
});

app.listen(PORT, () => {
    console.log(`API rodando no endereço http://localhost:${PORT}`);
});
