import { Token } from '@prisma/client';

export interface ITokenRepository {
  create(id: string, token: string): Promise<Token>;
  update(id: string, token: string): Promise<Token>;
}
