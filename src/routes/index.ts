import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

import { CreateUserController } from '../controllers/CreateUserController';
import { AuthenticateUserController } from '../controllers/AuthenticateUserController';
import { SearchGithubProfileController } from '../controllers/SearchGithubProfileController';

export const router = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const searchGithubProfileController = new SearchGithubProfileController();

router.post('/register', createUserController.handle);

router.post('/login', authenticateUserController.handle);

router.post('/profile', ensureAuthenticated, searchGithubProfileController.handle);