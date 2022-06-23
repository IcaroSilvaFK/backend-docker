import { User } from '@prisma/client';

export interface IUserProps {
  userName: string;
  email: string;
  password: string;
}

export interface IUsersService {
  create(data: IUserProps): Promise<Partial<User>>;
  delete(id: string): Promise<void>;
  update(id: string, data: Partial<IUserProps>): Promise<User>;
  findMany(): Promise<User[]>;
  login(email: string, password: string): Promise<Partial<User>>;
}
