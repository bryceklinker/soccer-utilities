import {
  UserMetadata,
  UserModel,
  UserRoleModel,
} from '@soccer-utilities/models';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserRoleDto implements UserRoleModel {
  @ApiPropertyOptional({ type: String })
  id?: string;

  @ApiPropertyOptional({ type: String })
  name?: string;

  @ApiPropertyOptional({ type: String })
  description?: string;
}

export class UserMetadataDto implements UserMetadata {
  @ApiPropertyOptional({ type: Number })
  rate?: number;
}

export class UserDto implements UserModel {
  @ApiProperty({ type: [UserRoleDto] })
  roles: Array<UserRoleModel>;

  @ApiPropertyOptional({ type: UserMetadataDto })
  user_metadata?: UserMetadata;

  @ApiProperty({ type: String })
  username: string;
}
