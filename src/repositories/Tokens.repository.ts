import { Token } from '@prisma/client';

import { prismaClient } from '../configs/prisma';

import { ITokenRepository } from './interfaces/TokenRepository.interface';

export class TokenRepository implements ITokenRepository {
  async create(id: string, token: string): Promise<Token> {
    const tokenDatabase = await prismaClient.token.create({
      data: {
        userId: id,
        token,
      },
    });

    return tokenDatabase;
  }
  async update(id: string, token: string): Promise<Token> {
    const tokenUpdated = await prismaClient.token.update({
      where: {
        userId: id,
      },
      data: {
        token,
      },
    });

    return tokenUpdated;
  }
}
