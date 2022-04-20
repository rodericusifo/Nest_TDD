import { CreateUserDTO } from '@app/users/dto/create-user.dto';
import { UserDTO } from '@app/users/dto/user.dto';
import { IUsersService } from '@app/users/service/interface/users.service.interface';

export class UsersMockService implements IUsersService {
  createUser(payload: CreateUserDTO): Promise<UserDTO> {
    throw new Error('Method not implemented.');
  }
}
