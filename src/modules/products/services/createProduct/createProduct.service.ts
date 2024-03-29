import { inject, injectable } from 'tsyringe';
import {
    CreateProductDTO,
    createProductDTOSchema,
} from '../../dtos/createProduct.dto';
import { ProductsRepository } from '../../repository/products.repository';
import { ResponseFormat } from 'src/shared/providers/ResponseFormat';

@injectable()
export class CreateProductService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: ProductsRepository,
    ) {}

    async execute(data: CreateProductDTO) {
        try {
            createProductDTOSchema.parse(data);
        } catch (error) {
            return new ResponseFormat(400, { message: error });
        }

        try {
            const product = await this.productsRepository.createProduct(data);

            return new ResponseFormat(201, product);
        } catch (error) {
            return new ResponseFormat(500, { message: error.message });
        }
    }
}
