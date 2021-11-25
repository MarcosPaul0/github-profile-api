import { Request, Response } from 'express';
import { DeleteUserService } from '../services/DeleteUserService';

export class DeleteUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const id = req.query.id as string;

    const deleteUserService = new DeleteUserService();

    const user = await deleteUserService.execute(id);

    return res.status(200).json(user);
  }
}