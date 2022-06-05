import { User } from '@app/database/entities/user.entity';
import { IUsersRepository } from '@app/database/interfaces/users.repository.interface';
import { IUserQuery } from '@shared/interfaces/query/user.query.interface';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(User)
export class UsersRepository
  extends Repository<User>
  implements IUsersRepository
{
  findUserWithEmail(query: Partial<IUserQuery>): Promise<User> {
    return this.findOne({
      where: {
        email: query.email,
      },
    });
  }
  saveUser(data: Partial<User>): Promise<User> {
    return this.save(data);
  }
}
