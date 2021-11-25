import prismaClient from '../prisma';
import { hash } from 'bcryptjs';
import { User } from '../models/User';
import { AppError } from '../errors/AppError';

interface ICreateUserRequest {
  name: string;
  email: string;
  password: string;
}

export class CreateUserService {
  async execute({ name, email, password }: ICreateUserRequest): Promise<User> {
    const user = await prismaClient.user.findFirst({
      where: { email }
    });

    if(user) {
      throw new AppError('User already exists!');
    }

    const passwordHash = await hash(password, 8);

    const newUser  = await prismaClient.user.create({
      data: {
        name,
        email,
        password: passwordHash
      }
    });

    return newUser;
  }
}