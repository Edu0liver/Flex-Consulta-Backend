import { inject, injectable } from 'tsyringe';
import {
    CreateProductDTO,
    createProductSchema,
} from '../../dtos/createProduct.dto';
import { ResponseFormat } from 'src/shared/providers/ResponseFormat';
import { IProductsRepository } from '../../repository/interface/IProducts.repository';

@injectable()
export class CreateProductService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
    ) {}

    async execute(data: CreateProductDTO): Promise<ResponseFormat> {
        try {
            createProductSchema.parse(data);
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
