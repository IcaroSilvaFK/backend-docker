import { Request, Response } from 'express';
import { ITokenController } from './interfaces/TokenController.interface';

import { AppError } from '../Errors/App.error';
import { TokenService } from '../services/Token.service';

export class TokenController implements ITokenController {
  constructor(private readonly tokenService: TokenService) {}

  async refresh(request: Request, response: Response): Promise<Response> {
    const { userId, oldToken } = request.body;

    if (!oldToken) {
      return response.status(401).json({
        message: 'Token as missing a type',
      });
    }

    try {
      const token = await this.tokenService.update(userId, oldToken);

      return response.status(200).json({
        message: 'Token successfully revalidated',
        token,
        timesTamp: new Date().toDateString(),
      });
    } catch (err) {
      if (err instanceof AppError) {
        return response.status(err.httpStatus).json({
          message: err.message,
          timesTamp: new Date().toDateString(),
        });
      }
      return response.status(500).json({
        message: 'Internal server error',
        timesTamp: new Date().toDateString(),
      });
    }
  }
}
