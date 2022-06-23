export class AppError extends Error {
  public message: string;
  public httpStatus: number;

  constructor(message: string, status: number) {
    super();
    this.message = message;
    this.httpStatus = status;
  }
}
