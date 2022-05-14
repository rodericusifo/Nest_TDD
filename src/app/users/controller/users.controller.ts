import { CreateUserBodyRequest } from '@app/users/request/body/create-user.body.request';
import { UsersService } from '@app/users/service/users.service';
import { ResponseService } from '@lib/modules/response/response.service';
import { Body, Controller, Post } from '@nestjs/common';
import { UserSuccessResponse } from '@shared/constants/response/success/user.response.success';

@Controller('users')
export class UsersController {
  constructor(
    private readonly responseService: ResponseService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  async createUser(@Body() body: CreateUserBodyRequest) {
    const data = await this.usersService.createUser({ body });
    return this.responseService.success(
      UserSuccessResponse.CREATE_USER_SUCCESS,
      data,
    );
  }
}
