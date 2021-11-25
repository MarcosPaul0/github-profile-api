import prismaClient from '../prisma';
import { AppError } from '../errors/AppError';
import { User } from '../models/User';

export class DeleteUserService {
  async execute(id: string): Promise<User> {
    try {
      const deletedUser = await prismaClient.user.delete({
        where: { id }
      });

      return deletedUser;
    } catch (err) {
      throw new AppError('User not found!', 404);
    }
  }
}