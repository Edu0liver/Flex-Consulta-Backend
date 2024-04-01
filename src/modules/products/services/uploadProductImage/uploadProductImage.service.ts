import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '../../repository/interface/IProducts.repository';
import { ResponseSender } from 'src/shared/providers/ResponseSender';
import { IStorageProvider } from 'src/shared/providers/StorageProvider/IStorageProvider';

interface IRequest {
    id: string;
    imageName: string;
}

@injectable()
export class UploadProductImageService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
    ) {}

    async execute({ id, imageName }: IRequest): Promise<ResponseSender> {
        try {
            await this.productsRepository.updateProduct(id, { imageName });
            await this.storageProvider.save(imageName, 'products');

            return new ResponseSender(200, { message: 'ok' });
        } catch (error) {
            return new ResponseSender(500, { message: error.message });
        }
    }
}
