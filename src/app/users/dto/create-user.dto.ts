import { CreateUserBodyRequest } from '@app/users/request/body/create-user.body.request';
import { CreateDTO } from '@lib/dto/create.dto';

export class CreateUserDTO extends CreateDTO<CreateUserBodyRequest> {}
