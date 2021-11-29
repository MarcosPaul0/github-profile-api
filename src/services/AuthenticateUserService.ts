import prismaClient from '../prisma';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { AppError } from '../errors/AppError';

interface IAuthenticateUserRequest {
  email: string;
  password: string;
}

interface AuthenticateUserResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  }
}

export class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateUserRequest): Promise<AuthenticateUserResponse> {
    const user = await prismaClient.user.findFirst({
      where: { email }
    })

    if(!user) {
      throw new AppError('Email/senha incorreta!');
    }

    const passwordMatch = await compare(password, user.password);

    if(!passwordMatch) {
      throw new AppError('Email/senha incorreta!');
    }

    const token = sign({
      email: email
    }, process.env.TOKEN_SECRET_KEY, {
      subject: user.id,
      expiresIn: '1d'
    })

    const { id, name, email: userEmail } = user;

    return { 
      token, 
      user: {
        id,
        name,
        email: userEmail
      }
    };
  }
}