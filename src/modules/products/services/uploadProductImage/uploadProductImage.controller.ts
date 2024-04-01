import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UploadProductImageService } from './uploadProductImage.service';

export class UploadProductImageController {
    async handle(req: Request, res: Response) {
        const { id } = req.params;
        const image = req.file as Express.Multer.File;

        const uploadProductImageService = container.resolve(
            UploadProductImageService,
        );

        const { statusCode, data } = await uploadProductImageService.execute({
            id,
            imageName: image.originalname,
        });

        return res.status(statusCode).json(data);
    }
}
