import { Router } from 'express';
import { AuthenticateUserController } from 'src/modules/users/services/authenticateUser/authenticateUser.controller';

export const usersRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

usersRoutes.post('/login', authenticateUserController.handle);
