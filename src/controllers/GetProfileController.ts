import { Request, Response } from 'express';
import { GetProfileService } from '../services/GetProfileService';

export class GetProfileController {
  async handle(req: Request, res: Response): Promise<Response> {
    const getProfileService = new GetProfileService();

    const user = await getProfileService.execute(req.user_id);

    return res.status(200).json(user);
  }
}