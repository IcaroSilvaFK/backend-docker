import { Token } from '@prisma/client';

export interface ITokenRepository {
  create(userId: string, oldToken?: string): Promise<Token>;
  update(userId: string, oldToken: string): Promise<Token>;
}
