import { Request, Response } from 'express';
import { CreateProductService } from './createProduct.service';
import { createProductDTOSchema } from '../../dtos/createProduct.dto';

export class CreateProductController {
    constructor(private createProductService: CreateProductService) {}

    async handle(req: Request, res: Response) {
        const { nome, descricao, price } = createProductDTOSchema.parse(
            req.body,
        );

        const product = await this.createProductService.execute({
            nome,
            descricao,
            price,
        });

        return res.status(201).json(product);
    }
}
