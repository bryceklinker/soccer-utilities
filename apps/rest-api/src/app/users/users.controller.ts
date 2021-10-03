import { Controller, Get } from '@nestjs/common';
import {
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CurrentUser } from '@soccer-utilities/nest-auth0';
import { UserModel } from '@soccer-utilities/models';
import { UserDto } from './dtos';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  @Get('current')
  @ApiOkResponse({ type: UserDto })
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  getCurrent(@CurrentUser() user: UserModel) {
    return user;
  }
}
