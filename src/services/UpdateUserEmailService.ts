import prismaClient from '../prisma';
import { AppError } from '../errors/AppError';
import { User } from '../models/User';

interface IUpdateUserEmailRequest {
  id: string;
  email: string;
}

export class UpdateUserEmailService {
  async execute({ id, email }: IUpdateUserEmailRequest): Promise<User> {
    try {
      const updated_at = new Date();
      const updatedUser = await prismaClient.user.update({
        where: { id },
        data: { email, updated_at }
      })
      
      return updatedUser
    } catch(err) {
      throw new AppError('Usuário não encontrado!', 404);
    }
  }
}