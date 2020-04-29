import { Response } from 'express';

import { ExpressRequest } from './request.interface';

export interface ExpressContext {
  req: ExpressRequest;
  res: Response;
}
