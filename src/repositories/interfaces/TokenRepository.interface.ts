export type ResponseType = {
  token: string;
};

export interface ITokenRepository {
  create(userId: string, oldToken?: string): Promise<ResponseType>;
  update(userId: string, oldToken?: string): Promise<ResponseType>;
}
