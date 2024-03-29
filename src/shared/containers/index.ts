import { container } from 'tsyringe';
import 'reflect-metadata';
import { ProductsRepository } from '../../modules/products/repository/products.repository';
import { IProductsRepository } from 'src/modules/products/repository/interface/IProducts.repository';

container.registerSingleton<IProductsRepository>(
    'ProductsRepository',
    ProductsRepository,
);
