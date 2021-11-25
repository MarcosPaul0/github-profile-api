import { Request, Response } from 'express';
import { UpdateUserNameService } from '../services/UpdateUserNameService';

export class UpdateUserNameController {
  async handle(req: Request, res: Response): Promise<Response> {
    const id = req.params.id as string;

    const { name } = req.body;

    const updateUserNameService = new UpdateUserNameService();

    const updatedUser = await updateUserNameService.execute({ id, name });

    return res.status(200).json(updatedUser);
  }
}