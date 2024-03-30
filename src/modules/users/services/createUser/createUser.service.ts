import { genSalt, hash } from 'bcrypt';
import { CreateUserDTO, createUserSchema } from '../../dtos/createUser.dto';
import { IUsersRepository } from '../../repository/interface/IUsers.repository';
import { ResponseFormat } from 'src/shared/providers/ResponseFormat';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    async execute(data: CreateUserDTO): Promise<ResponseFormat> {
        try {
            createUserSchema.parse(data);
        } catch (error) {
            return new ResponseFormat(400, error.message);
        }

        try {
            const userAlreadyExists = await this.usersRepository.findByEmail(
                data.email,
            );

            if (userAlreadyExists) {
                return new ResponseFormat(400, {
                    message: 'User already exists',
                });
            }

            const salt = await genSalt(10);
            data.password = await hash(data.password, salt);

            const { id } = await this.usersRepository.create(data);

            return new ResponseFormat(201, { id });
        } catch (error) {
            return new ResponseFormat(500, error.message);
        }
    }
}
