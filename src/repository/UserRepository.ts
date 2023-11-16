import { PrismaClient } from "@prisma/client";
import { UserEntity } from "../entity/User";

export class UserRepository {
  constructor(private prisma: PrismaClient) {}

  async findByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async createUser(user: UserEntity) {
    return this.prisma.user.create({
      data: user,
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
  }
}
