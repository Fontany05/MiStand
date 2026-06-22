import { Request } from 'express';
import { Entrepreneur } from '@prisma/client';

export interface RequestWithUser extends Request {
  user: Entrepreneur;
}
