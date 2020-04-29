import { Request } from 'express';

export interface ExpressRequest extends Request {
  session: Express.Session;
}
