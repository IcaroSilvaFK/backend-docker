import { Order } from '@prisma/client';
import { PrismaClientUnknownRequestError } from '@prisma/client/runtime';
import { AppError } from '../Errors/App.error';
import { IOrdersRepository } from '../repositories/interfaces/OrdersRepository.interface';
import {
  IOrdersProps,
  IOrdersService,
} from './interfaces/Order.Service.interface';

export class OrdersService implements IOrdersService {
  constructor(private readonly orderRepository: IOrdersRepository) {}

  async create(userId: string, data: Partial<IOrdersProps>): Promise<Order> {
    try {
      const newOrder = await this.orderRepository.create(userId, data);

      return newOrder;
    } catch (err) {
      if (err instanceof PrismaClientUnknownRequestError) {
        throw new AppError(err.message, 500);
      }
      throw new AppError('Internal server error', 500);
    }
  }
  async update(orderId: string, data: Partial<IOrdersProps>): Promise<Order> {
    try {
      const newOrder = await this.orderRepository.update(orderId, data);

      return newOrder;
    } catch (err) {
      if (err instanceof PrismaClientUnknownRequestError) {
        throw new AppError(err.message, 500);
      }
      throw new AppError('Internal server error', 500);
    }
  }
  async delete(id: string): Promise<void> {
    try {
      await this.orderRepository.delete(id);
    } catch (err) {
      if (err instanceof PrismaClientUnknownRequestError) {
        throw new AppError(err.message, 500);
      }
      throw new AppError('Internal server error', 500);
    }
  }
  async findMany(): Promise<Order[]> {
    try {
      const orders = await this.orderRepository.findMany();

      return orders;
    } catch (err) {
      if (err instanceof PrismaClientUnknownRequestError) {
        throw new AppError(err.message, 500);
      }
      throw new AppError('Internal server error', 500);
    }
  }
}
