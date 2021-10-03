import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { UserModel } from '@soccer-utilities/models';
import { ManagementClient } from 'auth0';
import { ConfigService } from '@nestjs/config';
import { NestAuth0Config } from './nest-auth0-config';
import { Cache, CachingConfig } from 'cache-manager';

const ONE_DAY_IN_SECONDS = 60 * 60 * 24;
const USER_CACHING_CONFIG: CachingConfig = { ttl: ONE_DAY_IN_SECONDS };

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
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
    private readonly logger: Logger
  ) {}

  async getUser(userId: string): Promise<UserModel> {
    const cacheKey = AuthService.getUserCacheKey(userId);
    const cachedUser = await this.cache.get<UserModel>(cacheKey);
    if (cachedUser) {
      return cachedUser;
    }

    const user = await this.getUserFromAuth0(userId);
    await this.cache.set(cacheKey, user, USER_CACHING_CONFIG);
    return user;
  }

  private async getUserFromAuth0(userId: string): Promise<UserModel> {
    this.logger.log('Getting user with id', { userId });
    const user = await this.auth0Client.getUser({ id: userId });
    const roles = await this.auth0Client.getUserRoles({ id: userId });
    this.logger.log('Found user with id', { userId });
    return {
      username: user.username || user.name || user.user_id,
      user_metadata: user.user_metadata,
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

  private static getUserCacheKey(userId: string): string {
    return `user-${userId}`;
  }
}
