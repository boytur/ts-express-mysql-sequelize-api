import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

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
    return res
      .status(400)
      .json({
        success: false,
        message: "Validation error",
        errors: errors.array(),
      });
  }
  next();
};
