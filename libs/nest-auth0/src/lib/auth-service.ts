import { Injectable, Logger } from '@nestjs/common';
import { UserModel } from '@soccer-utilities/models';
import { ManagementClient } from 'auth0';
import { ConfigService } from '@nestjs/config';
import { NestAuth0Config } from './nest-auth0-config';

@Injectable()
export class AuthService {
  private _auth0Client: ManagementClient | null;

  get auth0Client(): ManagementClient {
    if (this._auth0Client) {
      return this._auth0Client;
    }

    return (this._auth0Client = this.createAuth0Client());
  }

  get config(): NestAuth0Config {
    return this.configService.get<NestAuth0Config>('auth');
  }

  constructor(
    private readonly configService: ConfigService,
    private readonly logger: Logger
  ) {}

  async getUser(userId: string): Promise<UserModel> {
    this.logger.log('Getting user with id', { userId });
    const user = (await this.auth0Client.getUser({ id: userId })) as UserModel;
    const roles = await this.auth0Client.getUserRoles({ id: userId });
    this.logger.log('Found user with id', { userId });
    return {
      ...user,
      roles: roles,
    };
  }

  private createAuth0Client(): ManagementClient {
    return new ManagementClient({
      clientId: this.config.clientId,
      clientSecret: this.config.clientSecret,
      domain: this.config.domain,
      scope: 'read:users',
    });
  }
}
