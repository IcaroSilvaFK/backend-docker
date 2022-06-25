import { NextFunction, Request, Response } from 'express';

export async function refreshTokenMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { authorization } = request.headers;
  const { userId } = request.body;

  if (!authorization) {
    return response.status(401).json({
      message: 'Token is missing a headers',
      timestTamp: new Date().toDateString(),
    });
  }

  const [, token] = authorization.split(' ');

  if (!token) {
    return response.status(401).json({
      message: 'Token is missing a headers',
      timestTamp: new Date().toDateString(),
    });
  }

  const oldToken = token;

  request.body = { oldToken, userId };

  next();
}
