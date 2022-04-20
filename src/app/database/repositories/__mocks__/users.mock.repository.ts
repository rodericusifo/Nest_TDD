/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from '@app/database/entities/user.entity';
import { IUsersRepository } from '@app/database/interfaces/users.repository.interface';

export class UsersMockRepository implements IUsersRepository {
  findUserWithEmail(_data: Partial<User>): Promise<User> {
    throw new Error('Method not implemented.');
  }
  saveUser(_data: Partial<User>): Promise<User> {
    throw new Error('Method not implemented.');
  }
}
