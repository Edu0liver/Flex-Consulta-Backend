import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '../../repository/interface/IProducts.repository';
import { ResponseSender } from 'src/shared/providers/ResponseSender';
import { IStorageProvider } from 'src/shared/providers/StorageProvider/IStorageProvider';
import {
    UploadProductImageDTO,
    uploadProductImageSchema,
} from '../../dtos/updateProductImage.dto';

@injectable()
export class UploadProductImageService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
    ) {}

    async execute({
        id,
        imageName,
    }: UploadProductImageDTO): Promise<ResponseSender> {
        try {
            uploadProductImageSchema.parse({ id, imageName });
        } catch (error) {
            return new ResponseSender(400, { message: error });
        }

        try {
            const product = await this.productsRepository.getProducts({
                id,
                page: '1',
                size: '1',
            });

            if (!product.length) {
                return new ResponseSender(404, {
                    message: 'Product not found!',
                });
            }

            await this.productsRepository.updateProduct(id, { imageName });
            await this.storageProvider.save(imageName, 'products');

            return new ResponseSender(201, {
                message: 'Product image registered!',
            });
        } catch (error) {
            return new ResponseSender(500, { message: error.message });
        }
    }
}
