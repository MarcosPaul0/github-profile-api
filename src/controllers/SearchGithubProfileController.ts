import { Request, Response } from 'express';
import { SearchGithubProfileService } from '../services/SearchGithubProfileService';

export class SearchGithubProfileController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { profile } = req.body;

    const searchGithubProfileService = new SearchGithubProfileService();

    const result = await searchGithubProfileService.execute(profile);

    return res.status(200).json(result);
  }
}