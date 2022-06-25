export type ResponseType = {
  token: string;
};
export interface ITokenService {
  create(userId: string): Promise<ResponseType>;
  update(userId: string, oldToken?: string): Promise<ResponseType>;
}
