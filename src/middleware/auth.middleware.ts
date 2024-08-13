import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { CustomResponse } from "./responseMiddleware";
import { User } from "../models/user.model";

interface CustomRequest extends Request {
  user?: User;
}

/**
 * Middleware function for authentication.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next function to be called.
 *
 * @remarks
 * This middleware function is responsible for authenticating the user based on the provided token in the cookies.
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
  // Extract token from cookiese
  const token = req.cookies.moa_cookie;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET!, (err: any, user: any) => {
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
