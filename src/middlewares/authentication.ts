import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { prismaClient } from '../configs/prisma';

export async function authentication(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(403).json({
      message: 'You need an authorization to do this operation',
      timesTamp: new Date().toDateString(),
    });
  }
  const [, token] = authorization.split('');

  try {
    const jwtVerify = jwt.verify(token, 'whyy');
    const { id } = request.body;
    const userExists = await prismaClient.token.findFirst({
      where: {
        userId: id,
      },
    });

    if (!userExists) {
      await prismaClient.token.create({
        data: {
          userId: id,
          token,
        },
      });
    }
  } catch (err) {
    return response.status(403).json({
      message: 'Token is invalid',
      timesTamp: new Date().toDateString(),
    });
  }
}
