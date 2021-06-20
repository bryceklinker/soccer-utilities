export interface NestAuth0Config {
  jwksRequestsPerMinute?: number;
  issuerUrl: string;
  audience: string;
}
