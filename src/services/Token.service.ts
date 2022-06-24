import { Token } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

import { AppError } from '../Errors/App.error';
import { ITokenRepository } from '../repositories/interfaces/TokenRepository.interface';
import { ITokenService } from './interfaces/Token.Service.interface';

export class TokenService implements ITokenService {
  constructor(private readonly tokenRepository: ITokenRepository) {}
  async create(id: string, token: string): Promise<Token> {
    try {
      const dbToken = await this.tokenRepository.create(id, token);

      return dbToken;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        throw new AppError(err.message, 500);
      }
      throw new AppError('Unexpected error', 500);
    }
  }
  async update(id: string, token: string): Promise<Token> {
    try {
      const updatedDbToken = await this.tokenRepository.update(id, token);

      return updatedDbToken;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        throw new AppError(err.message, 500);
      }
      throw new AppError('Unexpected error', 500);
    }
  }
}
