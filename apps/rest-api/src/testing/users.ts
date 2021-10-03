import { UserModel, Role } from '@soccer-utilities/models';

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
