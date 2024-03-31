import { genSalt, hash } from 'bcrypt';
import { CreateUserDTO, createUserSchema } from '../../dtos/createUser.dto';
import { IUsersRepository } from '../../repository/interface/IUsers.repository';
import { ResponseSender } from 'src/shared/providers/ResponseSender';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    async execute(data: CreateUserDTO): Promise<ResponseSender> {
        try {
            createUserSchema.parse(data);
        } catch (error) {
            return new ResponseSender(400, error.message);
        }

        try {
            const userAlreadyExists = await this.usersRepository.findByEmail(
                data.email,
            );

            if (userAlreadyExists) {
                return new ResponseSender(400, {
                    message: 'User already exists',
                });
            }

            const salt = await genSalt(10);
            data.password = await hash(data.password, salt);

            const { id } = await this.usersRepository.createUser(data);

            return new ResponseSender(201, { id });
        } catch (error) {
            return new ResponseSender(500, error.message);
        }
    }
}
