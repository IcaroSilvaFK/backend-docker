import { Token } from '@prisma/client';

export interface ITokenService {
  create(userId: string): Promise<Token>;
  update(userId: string, oldToken?: string): Promise<Token>;
}
