export interface NestAuth0Config {
  jwksRequestsPerMinute?: number;
  issuerUrl: string;
  audience: string;
  clientId: string;
  clientSecret: string;
  domain: string;
}
