import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { ZodError } from "zod";
import { RequestUserDTO } from "../dto/RequestUserDTO";
import { UserRepository } from "../repository/UserRepository";
import { UserService } from "../service/UserService";

const prisma = new PrismaClient();
const userRepository = new UserRepository(prisma);
const userService = new UserService(userRepository);

export async function createUser(req: Request, res: Response) {
  try {
    const userDto: RequestUserDTO = RequestUserDTO.parse(req.body);
    const user = await userService.createUser(userDto);
    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    if (error instanceof ZodError) {
      return res.status(400).json({error: error.errors[0].message});
    }
    if (error instanceof Error) {
      return res.status(400).json({error: error.message});
    }
    return res.status(500).json({error: "Erro Interno do Servidor"});
  }
}

export async function getUsers(req: Request, res: Response) {
  const users = await userService.getUsers();
  return res.status(200).json(users);
}