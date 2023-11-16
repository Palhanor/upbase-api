import { z } from "zod";

export interface RequestUserDTO {
    username: string;
    email: string;
    name: string;
    password: string;
    student: boolean;
    teacher: boolean;
    passwordConfirmation: string;
}

export const RequestUserDTO = z.object({
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
  