import { HttpStatusCodes } from './http-status-codes';
import { RestRequest } from 'msw';

export interface TestingRequestOptions {
  status?: HttpStatusCodes;
  delay?: number;
  captureRequest?: (req: RestRequest) => void;
}
