import 'reflect-metadata';
import { vi, describe, beforeEach, expect, it } from 'vitest';
import { ProductsRepository } from 'src/modules/products/repository/products.repository';
import { UploadProductImageService } from '../uploadProductImage.service';
import { S3StorageProvider } from 'src/shared/providers/StorageProvider/implementations/S3StorageProvider';
import { LocalStorageProvider } from 'src/shared/providers/StorageProvider/implementations/LocalStorageProvider';

let uploadProductImageService: UploadProductImageService;
const productsRepositoryMock = new ProductsRepository();
const storageProviderMock =
    process.env.disk === 's3'
        ? new S3StorageProvider()
        : new LocalStorageProvider();

vi.spyOn(storageProviderMock, 'save').mockResolvedValue('filename');
vi.spyOn(productsRepositoryMock, 'updateProduct').mockResolvedValue({
    id: '1',
    name: 'car',
    description: '4x4',
    price: 100000,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
    imageName: null,
});
vi.spyOn(productsRepositoryMock, 'getProducts').mockResolvedValue([
    {
        id: '1',
        name: 'car',
        description: '4x4',
        price: 100000,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
        imageName: null,
    },
]);

describe('UploadProductImageService', () => {
    beforeEach(() => {
        uploadProductImageService = new UploadProductImageService(
            productsRepositoryMock,
            storageProviderMock,
        );
    });

    it('should update a product', async () => {
        const response = await uploadProductImageService.execute({
            id: '1',
            imageName: 'filename',
        });

        expect(response.data).toEqual({
            message: 'Product image registered!',
        });
        expect(response.statusCode).toEqual(201);
    });

    it('should throw a validation error', async () => {
        const response = await uploadProductImageService.execute({
            id: '',
            imageName: '',
        });

        expect(response.statusCode).toEqual(400);
    });

    it('should throw a not found product error', async () => {
        vi.spyOn(productsRepositoryMock, 'getProducts').mockResolvedValueOnce(
            [],
        );

        const response = await uploadProductImageService.execute({
            id: '1',
            imageName: 'filename',
        });

        expect(response.statusCode).toEqual(404);
    });

    it('should throw a internal error', async () => {
        vi.spyOn(productsRepositoryMock, 'updateProduct').mockRejectedValueOnce(
            new Error('Internal error'),
        );

        const response = await uploadProductImageService.execute({
            id: '1',
            imageName: 'filename',
        });

        expect(response.statusCode).toEqual(500);
        expect(response.data).toEqual({ message: 'Internal error' });
    });
});
