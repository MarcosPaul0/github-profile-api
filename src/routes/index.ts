import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

import { CreateUserController } from '../controllers/CreateUserController';
import { AuthenticateUserController } from '../controllers/AuthenticateUserController';
import { SearchGithubProfileController } from '../controllers/SearchGithubProfileController';
import { ListUsersController } from '../controllers/ListUsersController';
import { ReadUserController } from '../controllers/ReadUserController';
import { UpdateUserEmailController } from '../controllers/UpdateUserEmailController';
import { UpdateUserPasswordController } from '../controllers/UpdateUserPasswordController';
import { UpdateUserNameController } from '../controllers/UpdateUserNameController';
import { DeleteUserController } from '../controllers/DeleteUserController';
import { GetProfileController } from '../controllers/GetProfileController';

export const router = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const searchGithubProfileController = new SearchGithubProfileController();
const listUsersController = new ListUsersController();
const readUserController = new ReadUserController();
const updateUserEmailController = new UpdateUserEmailController();
const updateUserPasswordController = new UpdateUserPasswordController();
const updateUserNameController = new UpdateUserNameController();
const deleteUserController = new DeleteUserController();
const getProfileController = new GetProfileController();

router.post('/register', createUserController.handle);

router.post('/login', authenticateUserController.handle);

router.post('/search', ensureAuthenticated, searchGithubProfileController.handle);

router.get('/users', ensureAuthenticated, listUsersController.handle);

router.get('/users/:id', ensureAuthenticated, readUserController.handle);

router.put('/users/email/:id', ensureAuthenticated, updateUserEmailController.handle);

router.put('/users/password/:id', ensureAuthenticated, updateUserPasswordController.handle);

router.put('/users/name/:id', ensureAuthenticated, updateUserNameController.handle);

router.delete('/users/:id', ensureAuthenticated, deleteUserController.handle);

router.get('/profile', ensureAuthenticated, getProfileController.handle);