import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { userValidationRules } from "../utils/validators";
import { validate } from "../middleware/validate";

const router = Router();
const userController = new UserController();

router.post(
  "/users",
  userValidationRules(),
  validate,
  userController.createUser
);

export default router;
