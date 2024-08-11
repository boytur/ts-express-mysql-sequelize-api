import { Request, Response, NextFunction } from "express";

export interface CustomResponse extends Response {
  customSuccess: (data: any, status: number, message?: string, metaData?: {
    page: number;
    totalPages: number;
    totalCount: number;
    perPage: number;
  }) => void;
  customError: (message: string, status: number, errors?: any[]) => void;
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
    message?: string,
    metaData?: {
      page: number;
      totalPages: number;
      totalCount: number;
      perPage: number;
    },
  ) => {
    (res as CustomResponse).status(status).json({
      success: true,
      message: message || "Operation successful",
      data,
      metaData
    });
  };

  (res as CustomResponse).customError = (
    message: string,
    status: number,
    errors?: any[]
  ) => {
    (res as CustomResponse).status(status).json({
      success: false,
      message,
      errors,
    });
  };

  next();
};
