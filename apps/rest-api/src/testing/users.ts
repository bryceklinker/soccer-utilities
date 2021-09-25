import { UserModel } from '@soccer-utilities/models';
import { Role } from '@soccer-utilities/nest-auth0';

export const ADMIN_USER: UserModel = {
  username: 'the.admin',
  roles: [{ name: Role.admin }],
};

export const CONCESSIONS_USER: UserModel = {
  username: 'the.concessions',
  roles: [{ name: Role.concessions }],
  user_metadata: {
    rate: 14,
  },
};
