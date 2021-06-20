import { NestAuth0Config } from '@soccer-utilities/nest-auth0';

export default (): {auth: NestAuth0Config} => ({
  auth: {
    issuerUrl: process.env.ISSUER_URL || 'not found',
    audience: process.env.AUDIENCE || 'not found'
  }
})
