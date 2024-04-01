import { inject, injectable } from 'tsyringe';
import { ResponseSender } from 'src/shared/providers/ResponseSender';
import {
    DeleteProductSchema,
    deleteProductSchema,
} from '../../dtos/deleteProduct.dto';
import { IProductsRepository } from '../../repository/interface/IProducts.repository';
import { IStorageProvider } from 'src/shared/providers/StorageProvider/IStorageProvider';

@injectable()
export class DeleteProductService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
    ) {}

    async execute({ id }: DeleteProductSchema): Promise<ResponseSender> {
        try {
            deleteProductSchema.parse({ id });
        } catch (error) {
            return new ResponseSender(400, { message: error });
        }

        try {
            const product = await this.productsRepository.deleteProduct(id);

            if (product.imageName) {
                await this.storageProvider.delete(
                    product.imageName,
                    'products',
                );
            }

            return new ResponseSender(204, product);
        } catch (error) {
            return new ResponseSender(500, { message: error.message });
        }
    }
}
