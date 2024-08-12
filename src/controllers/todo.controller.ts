import { Request, Response } from "express";
import { CustomResponse } from "../middleware/responseMiddleware";
import { Todo } from '../models/todo.model';
import { TodoService } from "../services/todo.service";
import { getUserId } from '../utils/decode';

/**
 * Represents a TodoController class that handles CRUD operations for todos.
 */
/**
 * Represents a TodoController class that handles CRUD operations for todos.
 */
export class TodoController {
  /**
   * Creates a new todo.
   * @param req - The request object.
   * @param res - The response object.
   * @returns A promise that resolves to void.
   */
  public async createTodo(req: Request, res: Response): Promise<void> {
    try {
      // Get the user ID from the cookie
      const userId = await getUserId(req.cookies.moa_cookie);

      // Check if the todo name is provided
      if (!req.body.name) {
        (res as CustomResponse).customError("Bad Request", 400);
        return;
      }

      // Extract the todo name from the request body
      const todoname = req.body.name;

      // Create the data object for the new todo
      const data = {
        userId: userId,
        name: todoname,
      };

      // Create the todo using the TodoService
      let todo = await TodoService.create(data);

      // Send a custom success response
      (res as CustomResponse).customSuccess(todo, 201, "Todo created successfully");
      return;
    } catch (error: any) {
      // Handle any errors and send a custom error response
      (res as CustomResponse).customError(error.message, 500);
      return;
    }
  }

  /**
   * Updates an existing todo.
   * @param req - The request object.
   * @param res - The response object.
   * @returns A promise that resolves to void.
   */
  public async updateTodo(req: Request, res: Response): Promise<void> {
    try {
      // Get the user ID from the cookie
      const userId = await getUserId(req.cookies.moa_cookie);

      // Get the todo ID from the request parameters
      const todoId = req.params.id;

      // Get the new name from the request body
      const name = req.body.name;

      // Find the todo by ID using the TodoService
      const todo: Todo | null = await TodoService.findById(parseInt(todoId, 10));

      // Check if the todo exists
      if (!todo) {
        (res as CustomResponse).customError("Todo not found", 404);
        return;
      }

      // Check if the user is authorized to update the todo
      if (todo.dataValues.userId != userId) {
        (res as CustomResponse).customError("Unauthorized", 400);
        return;
      }

      // Update the todo name
      const newdata = { name: name };
      let todoUpdate = await TodoService.update(todo.dataValues.id, newdata);

      // Send a custom success response
      (res as CustomResponse).customSuccess(todoUpdate, 200, "Todo updated successfully");
    } catch (error: any) {
      // Handle any errors and send a custom error response
      (res as CustomResponse).customError(error.message, 500);
      return;
    }
  }

  /**
   * Deletes a todo.
   * @param req - The request object.
   * @param res - The response object.
   * @returns A promise that resolves to void.
   */
  public async deleteTodo(req: Request, res: Response): Promise<void> {
    try {
      // Get the user ID from the cookie
      const userId = await getUserId(req.cookies.moa_cookie);

      // Get the todo ID from the request parameters
      const todoId = req.params.id;

      // Find the todo by ID using the TodoService
      const todo: Todo | null = await TodoService.findById(parseInt(todoId, 10));

      // Check if the todo exists
      if (!todo) {
        (res as CustomResponse).customError("Todo not found", 404);
        return;
      }

      // Check if the user is authorized to delete the todo
      if (todo.dataValues.userId != userId) {
        (res as CustomResponse).customError("Unauthorized", 400);
        return;
      }

      // Delete the todo using the TodoService
      let todoDelete = await TodoService.delete(todo.dataValues.id);

      // Send a custom success response
      (res as CustomResponse).customSuccess(todoDelete, 200, "Todo deleted successfully");
    } catch (error: any) {
      // Handle any errors and send a custom error response
      (res as CustomResponse).customError(error.message, 500);
      return;
    }
  }

  /**
   * Retrieves a list of todos.
   * @param req - The request object.
   * @param res - The response object.
   * @returns A promise that resolves to void.
   */
  public async getTodos(req: Request, res: Response): Promise<void> {
    try {
      // Get the user ID from the cookie
      let userId = await getUserId(req.cookies.moa_cookie);

      // Extract query parameters
      let { perPage, page } = req.query;

      // Parse and set default values for limit and page
      const parsedLimit = perPage ? parseInt(perPage as string, 10) : 10;
      const parsedPage = page ? parseInt(page as string, 10) : 1;
      const parsedOffset = (parsedPage - 1) * parsedLimit;

      // Fetch todos using the TodoService
      const [todos, totalCount] = await Promise.all([
        TodoService.getTodos(parsedLimit, parsedOffset, userId),
        TodoService.getTotalTodoCount(),
      ]);

      // Calculate pagination metadata
      const totalPages = Math.ceil(totalCount / parsedLimit);

      // Send a custom success response with metadata
      (res as CustomResponse).customSuccess(
        {
          todos: todos,
        },
        200,
        "Todos retrieved successfully",
        {
          page: parsedPage,
          perPage: parsedLimit,
          totalCount: totalCount,
          totalPages: totalPages,
        }
      );
    } catch (error: any) {
      // Handle any errors and send a custom error response
      (res as CustomResponse).customError(error.message, 500);
      return;
    }
  }
}
