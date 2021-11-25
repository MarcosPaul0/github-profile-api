import { Request, Response } from 'express';
import { UpdateUserEmailService } from '../services/UpdateUserEmailService';

export class UpdateUserEmailController {
  async handle(req: Request, res: Response): Promise<Response> {
    const id = req.params.id as string;

    const { email } = req.body;

    const updateUserService = new UpdateUserEmailService();

    const updatedUser = await updateUserService.execute({ 
      id, 
      email
    });

    return res.status(200).json(updatedUser);
  }
}