import { User } from '../models/User';
import prismaClient from '../prisma';
import { AppError } from '../errors/AppError';

export class ReadUserService {
  async execute(id: string): Promise<User> {
    const user = await prismaClient.user.findFirst({
      where: { id }
    });

    if(!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }
}