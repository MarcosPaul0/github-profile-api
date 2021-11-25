import prismaClient from '../prisma';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { AppError } from '../errors/AppError';

interface IAuthenticateUserRequest {
  email: string;
  password: string;
}

export class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateUserRequest): Promise<string> {
    const user = await prismaClient.user.findFirst({
      where: { email }
    })

    if(!user) {
      throw new AppError('Email/password incorrect!');
    }

    const passwordMatch = await compare(password, user.password);

    if(!passwordMatch) {
      throw new AppError('Email/password incorrect!');
    }

    const token = sign({
      email: email
    }, process.env.TOKEN_SECRET_KEY, {
      subject: user.id,
      expiresIn: '1d'
    })

    return token;
  }
}