import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AuthenticateUserService } from './authenticateUser.service';

export class AuthenticateUserController {
    async handle(req: Request, res: Response) {
        const { email, password } = req.body;

        const authenticateUserService = container.resolve(
            AuthenticateUserService,
        );

        const { statusCode, data } = await authenticateUserService.execute({
            email,
            password,
        });

        return res.status(statusCode).json(data);
    }
}
