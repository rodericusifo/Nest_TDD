import { Exclude } from 'class-transformer';

export class UserDTO {
  id?: string;

  name?: string;

  email?: string;

  @Exclude({ toPlainOnly: true })
  password?: string;

  createdAt?: Date;

  updatedAt?: Date;

  @Exclude({ toPlainOnly: true })
  deletedAt?: Date;
}
