import { HttpStatusCodes } from '@soccer-utilities/core';
import { RestRequest } from 'msw';

export interface TestingRequestOptions {
  status?: HttpStatusCodes;
  delay?: number;
  captureRequest?: (req: RestRequest) => void;
}
