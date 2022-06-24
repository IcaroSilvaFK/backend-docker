import { Token } from '@prisma/client';

export interface ITokenService {
  create(id: string, token: string): Promise<Token>;
  update(id: string, token: string): Promise<Token>;
}
