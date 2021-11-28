import api from '../api'
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
      const user = await api.get('/search/users', {
        params: {
          q: profile
        }
      });

      const { login: userLogin } = user.data.items[0];

      const result = await api.get(`/users/${userLogin}`);

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