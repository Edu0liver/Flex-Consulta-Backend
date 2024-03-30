import 'reflect-metadata';
import { container } from 'tsyringe';
import { ProductsRepository } from '../../modules/products/repository/products.repository';
import { IProductsRepository } from 'src/modules/products/repository/interface/IProducts.repository';
import { UsersRepository } from 'src/modules/users/repository/users.repository';
import { IUsersRepository } from 'src/modules/users/repository/interface/IUsers.repository';

container.registerSingleton<IProductsRepository>(
    'ProductsRepository',
    ProductsRepository,
);

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository,
);
