import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { CustomResponse } from "./responseMiddleware";

/**
 * Validates the request object using the provided validation rules.
 * If there are validation errors, it sends a JSON response with a 400 status code,
 * containing the error details.
 * Otherwise, it calls the next middleware function.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function.
 */

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    (res as CustomResponse).customError("Validation failed", 400, errors.array());
    return;
  }
  next();
};
