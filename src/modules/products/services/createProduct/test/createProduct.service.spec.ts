import 'reflect-metadata';
import { vi, describe, beforeEach, expect, it } from 'vitest';
import { CreateProductService } from '../createProduct.service';
import { ProductsRepository } from 'src/modules/products/repository/products.repository';

let createProductService: CreateProductService;
const productsRepositoryMock = new ProductsRepository();
vi.spyOn(productsRepositoryMock, 'createProduct').mockResolvedValue({
    id: '1',
    name: 'car',
    description: '4x4',
    price: 100000,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
});

describe('CreateProductService', () => {
    beforeEach(() => {
        createProductService = new CreateProductService(productsRepositoryMock);
    });

    it('should create a new product', async () => {
        const response = await createProductService.execute({
            name: 'car',
            description: '4x4',
            price: 100000,
        });

        expect(response.data).toHaveProperty('id');
        expect(response.statusCode).toEqual(201);
    });

    it('should throw a validation error', async () => {
        const response = await createProductService.execute({
            name: 'car',
            description: '4x4',
            price: -1,
        });

        expect(response.statusCode).toEqual(400);
    });

    it('should throw a internal error', async () => {
        vi.spyOn(productsRepositoryMock, 'createProduct').mockRejectedValueOnce(
            new Error('Internal error'),
        );

        const response = await createProductService.execute({
            name: 'car',
            description: '4x4',
            price: 100000,
        });

        expect(response.statusCode).toEqual(500);
        expect(response.data).toEqual({ message: 'Internal error' });
    });
});
