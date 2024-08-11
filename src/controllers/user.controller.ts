import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { CustomResponse } from "../middleware/responseMiddleware";
import { User } from "../models/user.model";

/**
 * User controller class
 * @class
 * @public
 *
 * @description
 * This class handles the creation of user entities and related operations.
 * It provides a method to create a new user, checking if the email is already in use.
 * If the email is already in use, it returns a custom error response with status code 400.
 * Otherwise, it creates a new user and returns a success response with status code 201.
 * If any error occurs during the process, it returns a server error response with status code 500.
 *
 * @remarks
 * - It requires the "express" module and the "UserService" class from "../services/user.service".
 * - It uses the "CustomResponse" type from "../middleware/responseMiddleware" for custom error handling.
 *
 * @example
 * // Create a new user
 * const userController = new UserController();
 * userController.createUser(req, res);
 */

export class UserController {
  public async createUser(req: Request, res: Response): Promise<void> {
    try {
      const existingUser = await UserService.findByEmail(req.body.email);

      if (existingUser) {
        (res as CustomResponse).customError(
          "This email is already in use.",
          400
        );
        return;
      }

      let user = await UserService.create(req.body);

      (res as CustomResponse).customSuccess(
        user,
        201,
        "User created successfully"
      );
      return;
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}
