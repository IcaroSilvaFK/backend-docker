import { Request, Response } from 'express';

export interface IOrdersController {
  create(request: Request, response: Response): Promise<Response>;
  update(request: Request, response: Response): Promise<Response>;
  delete(request: Request, response: Response): Promise<Response>;
  findMany(request: Request, response: Response): Promise<Response>;
}
