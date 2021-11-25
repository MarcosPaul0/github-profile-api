import { Request, Response } from 'express';
import { CreateUserService } from '../services/CreateUserService';

export class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      name,
      email,
      password
    } = req.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      name,
      email,
      password
    });

    return res.status(200).json(user);
  }
}