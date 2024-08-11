import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { getUsersValidationRules, userValidationRules } from "../utils/validators";
import { validate } from "../middleware/validate";

const router = Router();
const userController = new UserController();

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
  userController.getUsers
);

export default router;
