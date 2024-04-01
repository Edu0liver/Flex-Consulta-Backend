import 'reflect-metadata';
import { container } from 'tsyringe';
import { ProductsRepository } from '../../modules/products/repository/products.repository';
import { IProductsRepository } from 'src/modules/products/repository/interface/IProducts.repository';
import { UsersRepository } from 'src/modules/users/repository/users.repository';
import { IUsersRepository } from 'src/modules/users/repository/interface/IUsers.repository';
import { LocalStorageProvider } from '../providers/StorageProvider/implementations/LocalStorageProvider';
import { S3StorageProvider } from '../providers/StorageProvider/implementations/S3StorageProvider';
import { IStorageProvider } from '../providers/StorageProvider/IStorageProvider';

const diskStorage: { [key: string]: any } = {
    local: LocalStorageProvider,
    s3: S3StorageProvider,
};
container.registerSingleton<IProductsRepository>(
    'ProductsRepository',
    ProductsRepository,
);

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository,
);

container.registerSingleton<IStorageProvider>(
    'StorageProvider',
    diskStorage[process.env.disk || 'local'],
);
