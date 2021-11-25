import { Request, Response } from 'express';
import { UpdateUserPasswordService } from '../services/UpdateUserPasswordService';

export class UpdateUserPasswordController {
  async handle(req: Request, res: Response): Promise<Response> {
    const id = req.params.id as string;

    const {
      actualPassword,
      newPassword
    } = req.body;

    const updateUserPasswordService = new UpdateUserPasswordService();

    const updatedUser = await updateUserPasswordService.execute({
      id,
      actualPassword,
      newPassword
    });

    return res.status(200).json(updatedUser);
  }
}