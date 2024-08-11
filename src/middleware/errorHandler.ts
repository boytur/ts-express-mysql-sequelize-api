import { Request, Response, NextFunction } from 'express';

/**
 * Handles errors that occur during the execution of middleware or route handlers.
 * 
 * @param err - The error object.
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next function to be called in the middleware chain.
 * @returns The response object with an appropriate status code and error message.
 * 
 * @remarks
 * This middleware function is responsible for handling errors that occur during the execution
 * of other middleware functions or route handlers. It logs the error to the console and sends
 * an appropriate response to the client.
 * 
 * If the error is a validation error, it sends a 400 Bad Request response with the error message.
 * Otherwise, it sends a 500 Internal Server Error response.
 * 
 * @example
 * // Usage:
 * app.use(errorHandler);
 */

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error('Error:', err);
  if (err.isValidationError) {
    return res.status(400).json({ success: false, message: err.message });
  }
  res.status(500).json({ success: false, message: 'Internal Server Error' });
}
