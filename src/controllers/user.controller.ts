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
      let { password, ...userWithoutPassword } = user.toJSON();

      (res as CustomResponse).customSuccess(
        userWithoutPassword,
        201,
        "User created successfully"
      );
      return;
    } catch (error: any) {
      (res as CustomResponse).customError(error.message, 500);
      return;
    }
  }

  public async getUsers(req: Request, res: Response): Promise<void> {
    try {
      // Extract query parameters
      let { perPage, page } = req.query;

      // Parse and set default values for limit and page
      const parsedLimit = perPage ? parseInt(perPage as string, 10) : 10;
      const parsedPage = page ? parseInt(page as string, 10) : 1;
      const parsedOffset = (parsedPage - 1) * parsedLimit;

      // Fetch users using the UserService
      const [users, totalCount] = await Promise.all([
        UserService.getUsers(parsedLimit, parsedOffset),
        UserService.getTotalUserCount(),
      ]);

      // Calculate pagination metadata
      const totalPages = Math.ceil(totalCount / parsedLimit);

      // Send a custom success response with metadata
      (res as CustomResponse).customSuccess(
        {
          users: users,
        },
        200,
        "Users retrieved successfully",
        {
          page: parsedPage,
          perPage: parsedLimit,
          totalCount: totalCount,
          totalPages: totalPages,
        }
      );
    } catch (error: any) {
      (res as CustomResponse).customError(error.message, 500);
      return;
    }
  }
}
