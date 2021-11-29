import { AppError } from "../errors/AppError";
import { User } from "../models/User";
import prismaClient from "../prisma";

interface IUpdateUserNameRequest {
  id: string;
  name: string;
}

export class UpdateUserNameService {
  async execute({ id, name }: IUpdateUserNameRequest): Promise<User> {
    const updated_at = new Date();

    try {
      const updatedUser = await prismaClient.user.update({
        where: { id },
        data: { name, updated_at }
      });
  
      return updatedUser;
    } catch(err) {
      throw new AppError('Usuário não encontrado!', 404);
    }
  }
}