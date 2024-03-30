import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
    sub: string;
}

export async function ensuredAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        return response.status(401).json({ message: 'Token Missing!' });
    }

    const [, token] = authHeader.split(' ');

    try {
        const secret_token = process.env.SECRET_TOKEN as string;

        const { sub: user_id } = verify(token, secret_token) as IPayload;

        request.user = {
            id: user_id,
        };

        next();
    } catch {
        return response.status(401).json({ message: 'Invalid Token!' });
    }
}
