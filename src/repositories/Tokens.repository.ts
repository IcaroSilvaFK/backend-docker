import { Token } from '@prisma/client';
import { sign } from 'jsonwebtoken';

import { prismaClient } from '../configs/prisma';
import { AppError } from '../Errors/App.error';

import { ITokenRepository } from './interfaces/TokenRepository.interface';

const key = process.env.SECRET_JSON_WEBTOKEN;
const time = 6000;

export class TokenRepository implements ITokenRepository {
  async create(userId: string, oldToken?: string): Promise<Token> {
    const tokenExists = await prismaClient.token.findFirst({
      where: {
        userId,
      },
    });
    const token = sign(
      {
        id: userId,
      },
      key,
      {
        expiresIn: time,
        subject: userId,
      },
    );
    if (!tokenExists) {
      const tokenDatabase = await prismaClient.token.create({
        data: {
          userId,
          token,
        },
      });

      return tokenDatabase;
    }
    if (oldToken && oldToken !== tokenExists.token) {
      throw new AppError('Token is invalid', 401);
    }
    const newtoken = await prismaClient.token.update({
      where: {
        userId,
      },
      data: {
        token,
      },
    });

    return newtoken;
  }

  async update(userId: string, oldToken: string) {
    const refreshToken = await prismaClient.token.findFirst({
      where: {
        userId,
      },
    });

    if (!refreshToken) {
      throw new AppError('Refresh token is invalid', 401);
    }

    const token = await this.create(userId, oldToken);

    return token;
  }
}
