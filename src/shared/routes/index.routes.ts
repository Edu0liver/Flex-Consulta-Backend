import 'reflect-metadata';
import { Router } from 'express';
import { productsRoutes } from './products.routes';
import { usersRoutes } from './users.routes';
import { ensuredAuthenticated } from '../middleware/ensureAutheticated.middleware';

export const router = Router();

router.use('/products', productsRoutes);
router.use('/users', ensuredAuthenticated, usersRoutes);
