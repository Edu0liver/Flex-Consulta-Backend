import { getProductsSchema } from '../../dtos/getProducts.dto';
import { GetProductsService } from './getProducts.service';
import { Request, Response } from 'express';

export class GetProductsController {
    constructor(private getProductsService: GetProductsService) {}

    async handle(req: Request, res: Response) {
        const { nome, descricao, order_by, order } = getProductsSchema.parse(
            req.query,
        );

        const products = await this.getProductsService.execute({
            nome,
            descricao,
            order_by,
            order,
        });

        return res.json(products);
    }
}
