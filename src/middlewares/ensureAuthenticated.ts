import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';
import { verify } from 'jsonwebtoken';

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authToken = req.headers.authorization;

  if(!authToken) {
    throw new AppError('Token perdido!');
  }

  const [, token] = authToken.split(' ');

  try {
    const { sub } = verify(token, process.env.TOKEN_SECRET_KEY);

    req.user_id = sub as string;

    next();
  } catch (err) {
    throw new AppError('Token inválido', 401);
  }

}