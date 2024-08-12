import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { TodoController } from "../controllers/todo.controller";

const router = Router();
const todoController = new TodoController();

router.post(
  "/todos",
  authMiddleware,
  todoController.createTodo
);

router.put(
  "/todos/:id",
  authMiddleware,
  todoController.updateTodo
);

router.delete(
  "/todos/:id",
  authMiddleware,
  todoController.deleteTodo
)

router.get(
  "/todos",
  authMiddleware,
  todoController.getTodos
)

export default router;
