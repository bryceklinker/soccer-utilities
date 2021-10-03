import { User } from '@auth0/auth0-react';

export interface AuthUser extends User {
  accessToken: string;
}
