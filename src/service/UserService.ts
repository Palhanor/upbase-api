import bcrypt from "bcrypt";
import { RequestUserDTO } from "../dto/RequestUserDTO";
import { UserEntity } from "../entity/User";
import { UserRepository } from "../repository/UserRepository";

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(userDto: RequestUserDTO) {
    const existingUsername = await this.userRepository.findByUsername(userDto.username);
    if (existingUsername) {
      throw new Error("O nome de usuário informado já está em uso");
    }

    const existingEmail = await this.userRepository.findByEmail(userDto.email);
    if (existingEmail) {
      throw new Error("O endereço de e-mail informado já está em uso");
    }

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,63}$/;
    if (!passwordPattern.test(userDto.password)) {
      throw new Error("A senha deve conter ao menos um caractere minúsculo, um maiúsculo e um dígito");
    }

    if (userDto.password !== userDto.passwordConfirmation) {
      throw new Error("As senhas informadas não coincidem");
    }

    if (userDto.student && userDto.teacher || !userDto.student && !userDto.teacher) {
      throw new Error("O novo usuário deve ser um estudante ou um professor");
    }

    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    
    const user = new UserEntity(
      userDto.name, 
      userDto.username, 
      userDto.email, 
      hashedPassword, 
      userDto.student, 
      userDto.teacher
    );

    return await this.userRepository.createUser(user);
  }
}


