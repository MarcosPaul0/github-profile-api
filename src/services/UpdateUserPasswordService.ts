import { User } from "../models/User";
import prismaClient from '../prisma';
import { compare, hash } from 'bcryptjs';
import { AppError } from "../errors/AppError";

interface IUpdateUserPasswordRequest {
  id: string;
  actualPassword: string;
  newPassword: string;
}

export class UpdateUserPasswordService {
  async execute({id, actualPassword, newPassword}: IUpdateUserPasswordRequest): Promise<User> {
    const user = await prismaClient.user.findFirst({
      where: { id }
    });

    if(!user) {
      throw new AppError('Usuário não encontrado!', 404);
    }

    const matchPassword = await compare(actualPassword, user.password);

    if(!matchPassword) {
      throw new AppError('Senha atual incorreta!');
    }

    const updated_at = new Date();

    const hashPassword = await hash(newPassword, 8);

    const updatedUser = await prismaClient.user.update({
      where: { id },
      data: { password: hashPassword, updated_at }
    });

    return updatedUser;
  }
}