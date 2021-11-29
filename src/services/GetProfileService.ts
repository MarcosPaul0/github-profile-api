import { AppError } from '../errors/AppError';
import prismaClient from '../prisma';

interface User {
  id: string;
  name: string;
  email: string;
}

export class GetProfileService {
  async execute(user_id: string): Promise<User> {
    const { id, name, email } = await prismaClient.user.findFirst({
      where: {
        id: user_id,
      }
    });

    if(!id) {
      throw new AppError('User not found');
    }

    return { id, name, email }
  }
}