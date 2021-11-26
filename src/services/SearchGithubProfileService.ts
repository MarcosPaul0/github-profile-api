import api from '../api';
import { AppError } from '../errors/AppError';

interface IGithubProfileResponse {
  login: string;
  email?: string;
  location: string;
  bio: string;
  public_repos: number;
  avatar_url: string;
  html_url: string;
}

export class SearchGithubProfileService {
  async execute(profile: string): Promise<IGithubProfileResponse> {
    try {
      const result = await api.get(`${profile}`);

      const {
        login,
        email,
        location,
        bio,
        public_repos,
        avatar_url,
        html_url
      } = result.data;

      return {
        login,
        email,
        location,
        bio,
        public_repos,
        avatar_url,
        html_url
      }
    } catch (err) {
      throw new AppError('User not found!', 404);
    }
  }
}