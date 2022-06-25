import { Order } from '@prisma/client';

export interface IOrdersProps {
  food: string;
  drink: string;
  cream: string;
  ammount: number;
  userId: string;
  concluded: boolean;
}

export interface IOrdersRepository {
  create(userId: string, data: Partial<IOrdersProps>): Promise<Order>;
  update(orderId: string, data: Partial<IOrdersProps>): Promise<Order>;
  delete(id: string): Promise<void>;
  findMany(): Promise<Order[]>;
}
