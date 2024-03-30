import { inject, injectable } from 'tsyringe';
import { ResponseFormat } from 'src/shared/providers/ResponseFormat';
import {
    DeleteProductSchema,
    deleteProductSchema,
} from '../../dtos/deleteProduct.dto';
import { IProductsRepository } from '../../repository/interface/IProducts.repository';

@injectable()
export class DeleteProductService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
    ) {}

    async execute({ id }: DeleteProductSchema): Promise<ResponseFormat> {
        try {
            deleteProductSchema.parse({ id });
        } catch (error) {
            return new ResponseFormat(400, { message: error });
        }

        try {
            const product = await this.productsRepository.deleteProduct(id);

            return new ResponseFormat(204, product);
        } catch (error) {
            return new ResponseFormat(500, { message: error.message });
        }
    }
}
