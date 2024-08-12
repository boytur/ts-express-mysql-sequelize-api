import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { getUsersValidationRules, userValidationRules } from "../utils/validators";
import { validate } from "../middleware/validate";
import { TodoController } from "../controllers/todo.controller";

const router = Router();
const userController = new UserController();
const todoController = new TodoController();

router.post(
  "/users",
  userValidationRules(),
  validate,
  userController.createUser
);

router.get(
  "/users", 
  getUsersValidationRules(), 
  validate, 
  authMiddleware,
  userController.getUsers
);

export default router;
