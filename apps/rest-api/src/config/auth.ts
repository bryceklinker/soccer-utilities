import { NestAuth0Config } from '@soccer-utilities/nest-auth0';

export default (): { auth: NestAuth0Config } => ({
  auth: {
    issuerUrl: process.env.ISSUER_URL || 'not found',
    audience: process.env.AUDIENCE || 'not found',
    domain: process.env.AUTH0_DOMAIN || 'not found',
    clientId: process.env.AUTH0_CLIENT_ID || 'not found',
    clientSecret: process.env.AUTH0_CLIENT_SECRET || 'not found',
  },
});
