import { Request, Response } from 'express';

export interface IUsersController {
  create(request: Request, response: Response): Promise<Response>;
  update(request: Request, response: Response): Promise<Response>;
  delete(request: Request, response: Response): Promise<Response>;
  findAll(request: Request, response: Response): Promise<Response>;
  login(request: Request, response: Response): Promise<Response>;
}
