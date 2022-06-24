import { Request, Response } from 'express';

export interface ITokenController {
  refresh(request: Request, response: Response): Promise<Response>;
}
