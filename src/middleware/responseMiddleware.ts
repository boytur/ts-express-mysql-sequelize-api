
import { Request, Response, NextFunction } from "express";

export interface CustomResponse extends Response {
  customSuccess: (data: any, status: number, message?: string) => void;
  customError: (message: string, status: number) => void;
}

/**
 * Middleware function that adds custom response methods to the Express response object.
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function.
 */
export const responseMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  (res as CustomResponse).customSuccess = (
    data: any,
    status: number,
    message?: string
  ) => {
    (res as CustomResponse).status(status).json({
      success: true,
      message: message || "Operation successful",
      data,
    });
  };

  (res as CustomResponse).customError = (
    message: string,
    status: number,
    errors?: string
  ) => {
    (res as CustomResponse).status(status).json({
      success: false,
      message,
    });
  };

  next();
};
