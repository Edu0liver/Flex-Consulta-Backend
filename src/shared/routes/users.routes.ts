import { Router } from 'express';
import { AuthenticateUserController } from 'src/modules/users/services/authenticateUser/authenticateUser.controller';
import { CreateUserController } from 'src/modules/users/services/createUser/createUser.controller';

export const usersRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const createUserController = new CreateUserController();

usersRoutes.post('/login', authenticateUserController.handle);
usersRoutes.post('/', createUserController.handle);
