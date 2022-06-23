import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { AppError } from '../Errors/App.error';
import { IUsersService } from '../services/interfaces/Users.Service.interface';
import { IUsersController } from './interfaces/UsersController.interface';

export class UsersController implements IUsersController {
  constructor(private readonly usersService: IUsersService) {}

  async create(request: Request, response: Response): Promise<Response> {
    const { userName, email, password } = request.body;

    if (!userName || !email || !password) {
      return response.status(400).json({
        message: 'username email or password as missing a type',
        timestamp: new Date().toDateString(),
      });
    }

    try {
      const newUser = await this.usersService.create({
        userName,
        email,
        password,
      });

      const token = jwt.sign(
        {
          id: newUser.id,
        },
        'whyy',
        {
          expiresIn: 1000 * 1000,
        },
      );

      return response.status(201).json({
        user: newUser,
        token,
        timesTamp: new Date().toDateString(),
      });
    } catch (err) {
      if (err instanceof AppError) {
        return response.status(err.httpStatus).json({
          message: err.message,
          cause: err.cause,
          timesTamp: new Date().toDateString(),
        });
      }
      return response.status(500).json({
        message: 'Internal server error',
        timesTamp: new Date().toDateString(),
      });
    }
  }
  async update(request: Request, response: Response): Promise<Response> {
    const { id, data } = request.body;

    if (!id || !data) {
      return response.status(400).json({
        message: 'ID or user infos as missing a type',
      });
    }

    try {
      const updatedUser = await this.usersService.update(id, data);

      return response.status(200).json({
        user: updatedUser,
        timesTamp: new Date().toDateString(),
      });
    } catch (err) {
      if (err instanceof AppError) {
        return response.status(err.httpStatus).json({
          message: err.message,
          cause: err.cause,
          timesTamp: new Date().toDateString(),
        });
      }
      return response.status(500).json({
        message: 'Internal server error',
        timesTamp: new Date().toDateString(),
      });
    }
  }
  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;

    if (!id) {
      return response.status(400).json({
        message: 'ID is missing a type',
        timesTamp: new Date().toDateString(),
      });
    }

    try {
      await this.usersService.delete(id);
      return response.status(200).json({
        message: 'User deleted success',
        timesTamp: new Date().toDateString(),
      });
    } catch (err) {
      if (err instanceof AppError) {
        return response.status(err.httpStatus).json({
          message: err.message,
          cause: err.cause,
          timesTamp: new Date().toDateString(),
        });
      }
      return response.status(500).json({
        message: 'Internal server error',
        timesTamp: new Date().toDateString(),
      });
    }
  }
  async findAll(request: Request, response: Response): Promise<Response> {
    try {
      const allUsers = await this.usersService.findMany();

      return response.status(200).json({
        users: allUsers,
        timesTamp: new Date().toDateString(),
      });
    } catch (err) {
      if (err instanceof AppError) {
        return response.status(err.httpStatus).json({
          message: err.message,
          cause: err.cause,
          timesTamp: new Date().toDateString(),
        });
      }
      return response.status(500).json({
        message: 'Internal server error',
        timesTamp: new Date().toDateString(),
      });
    }
  }

  async login(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(400).json({
        message: 'Email or Password as missing a type',
        timesTamp: new Date().toDateString(),
      });
    }

    try {
      const user = await this.usersService.login(email, password);
      const token = jwt.sign(
        {
          id: user.id,
        },
        'whyy',
        {
          expiresIn: 1000 * 1000,
        },
      );

      return response.status(200).json({
        user,
        token,
        timesTamp: new Date().toDateString(),
      });
    } catch (err) {
      if (err instanceof AppError) {
        return response.status(err.httpStatus).json({
          message: err.message,
          cause: err.cause,
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
