import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const key = process.env.SECRET_JSON_WEBTOKEN;

export async function authentication(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(401).json({
      message: 'You need an authorization to do this operation',
      timesTamp: new Date().toDateString(),
    });
  }
  const [, token] = authorization.split(' ');

  try {
    jwt.verify(token, key);

    return next();
  } catch (err) {
    return response.status(401).json({
      message: 'Token is invalid',
      timesTamp: new Date().toDateString(),
    });
  }
}
