import { User } from '@prisma/client';

export interface IUserProps {
  userName: string;
  email: string;
  password: string;
}

export interface IUsersRepository {
  create(data: IUserProps): Promise<User>;
  delete(id: string): Promise<void>;
  update(id: string, data: Partial<IUserProps>): Promise<User>;
  findMany(): Promise<User[]>;
}
