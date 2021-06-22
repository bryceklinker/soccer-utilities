import {User} from '@auth0/auth0-react';

export interface ApplicationUser extends User {
  accessToken: string;
}
