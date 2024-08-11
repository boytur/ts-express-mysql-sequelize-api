import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IUser } from "../interfaces/User.interface";
import { CustomResponse } from "./responseMiddleware";
interface CustomRequest extends Request {
  user?: IUser;
}

/**
 * Middleware function for authentication.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next function to be called.
 *
 * @remarks
 * This middleware function is responsible for authenticating the user based on the provided token in the request headers.
 * It verifies the token using the JWT_SECRET environment variable and sets the authenticated user in the request object.
 * If the token is not provided or invalid, it returns an appropriate error response.
 *
 * @returns void
 *
 * @throws {Error} - If the token is invalid or missing, an error is thrown.
 */

export function authMiddleware(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET!, (err, user: any) => {
      if (err) {
        (res as CustomResponse).customError("Invalid token", 401);
        return;
      }
      req.user = user;
      next();
    });
  } else {
    (res as CustomResponse).customError("Token not provided", 401);
    return;
  }
}
