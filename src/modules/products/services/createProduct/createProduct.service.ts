import { inject, injectable } from 'tsyringe';
import { CreateProductDTO } from '../../dtos/createProduct.dto';
import { ProductsRepository } from '../../repository/products.repository';
import { HttpException } from 'src/shared/error/HttpException';

@injectable()
export class CreateProductService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: ProductsRepository,
    ) {}

    async execute(data: CreateProductDTO) {
        try {
            return await this.productsRepository.createProduct(data);
        } catch {
            throw new HttpException('Erro ao criar produto', 500);
        }
    }
}
