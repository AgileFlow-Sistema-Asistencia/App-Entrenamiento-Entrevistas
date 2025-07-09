import { Request } from 'express';

export interface MyContext {
  req: any & {
    userId?: string;
    user?: {
      userId: string;
      role: string;
    };
  };
}