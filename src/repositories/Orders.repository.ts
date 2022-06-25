import { Order } from '@prisma/client';
import { prismaClient } from '../configs/prisma';
import {
  IOrdersProps,
  IOrdersRepository,
} from './interfaces/OrdersRepository.interface';

export class OrdersRepository implements IOrdersRepository {
  async create(userId: string, data: Partial<IOrdersProps>): Promise<Order> {
    const newOrder = await prismaClient.order.create({
      data: {
        userId,
        ...data,
      },
    });

    return newOrder;
  }
  async update(orderId: string, data: Partial<IOrdersProps>): Promise<Order> {
    const newOrder = await prismaClient.order.update({
      where: {
        id: orderId,
      },
      data: {
        ...data,
      },
    });

    return newOrder;
  }
  async delete(id: string): Promise<void> {
    await prismaClient.order.delete({
      where: {
        id,
      },
    });
  }
  async findMany(): Promise<Order[]> {
    const orders = await prismaClient.order.findMany();

    return orders;
  }
}
