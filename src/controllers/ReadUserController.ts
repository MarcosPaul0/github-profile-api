import { Request, Response } from 'express';
import { ReadUserService } from '../services/ReadUserService';

export class ReadUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const id = req.params.id as string;

    const readUserService = new ReadUserService();

    const user = await readUserService.execute(id);

    return res.status(200).json(user);
  }
}