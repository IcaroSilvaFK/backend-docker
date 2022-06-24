import { Order, User } from '@prisma/client';

export interface IUserProps {
  userName: string;
  email: string;
  password: string;
}

type FindManyProps = {
  userName: string;
  email: string;
  orders: Order[];
};

export interface IUsersService {
  create(data: IUserProps): Promise<Partial<User>>;
  delete(id: string): Promise<void>;
  update(id: string, data: Partial<IUserProps>): Promise<User>;
  findMany(): Promise<FindManyProps[]>;
  login(email: string, password: string): Promise<Partial<User>>;
}
