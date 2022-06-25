import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

import { AppError } from '../Errors/App.error';
import { ITokenRepository } from '../repositories/interfaces/TokenRepository.interface';
import {
  ITokenService,
  ResponseType,
} from './interfaces/Token.Service.interface';

export class TokenService implements ITokenService {
  constructor(private readonly tokenRepository: ITokenRepository) {}
  async create(userId: string): Promise<ResponseType> {
    try {
      const dbToken = await this.tokenRepository.create(userId);

      return dbToken;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        throw new AppError(err.message, 500);
      }
      if (err instanceof AppError) {
        throw new AppError(err.message, 500);
      }
      throw new AppError('Unexpected error', 500);
    }
  }
  async update(userId: string, oldToken?: string): Promise<ResponseType> {
    try {
      const dbToken = await this.tokenRepository.update(userId, oldToken);

      return dbToken;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        throw new AppError(err.message, 500);
      }
      if (err instanceof AppError) {
        throw new AppError(err.message, 500);
      }
      throw new AppError('Unexpected error', 500);
    }
  }
}
