import { Request, Response } from 'express';
import { AppError } from '../Errors/App.error';
import { IOrdersService } from '../services/interfaces/Order.Service.interface';
import { IOrdersController } from './interfaces/OrdersController.interface';

export class OrdersController implements IOrdersController {
  constructor(private readonly ordersService: IOrdersService) {}

  async create(request: Request, response: Response): Promise<Response> {
    const { userId, data } = request.body;
    if (!userId || !data) {
      return response.status(400).json({
        message: 'Id or data is missing a type',
        timesTamp: new Date().toDateString(),
      });
    }

    try {
      const order = await this.ordersService.create(userId, data);

      return response.status(201).json({
        order,
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
  async update(request: Request, response: Response): Promise<Response> {
    const { orderId, data } = request.body;

    if (!orderId || !data) {
      return response.status(400).json({
        message: 'ID or data is missing a type',
        timesTamp: new Date().toDateString(),
      });
    }

    try {
      const orderUpdated = await this.ordersService.update(orderId, data);

      return response.status(200).json({
        order: orderUpdated,
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
  async delete(request: Request, response: Response): Promise<Response> {
    const { orderId } = request.query;

    if (!orderId) {
      return response.status(400).json({
        message: 'ID is missing a type',
        timesTamp: new Date().toDateString(),
      });
    }

    try {
      await this.ordersService.delete(orderId as string);

      return response.status(200).json({
        message: 'Order deleted success',
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
  async findMany(request: Request, response: Response): Promise<Response> {
    try {
      const orders = await this.ordersService.findMany();

      return response.status(200).json({
        orders,
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
