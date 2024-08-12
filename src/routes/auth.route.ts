import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { loginValidateRules } from '../utils/validators';
import { validate } from '../middleware/validate';
const router = Router();

router.post('/login',
    loginValidateRules(),
    validate,
    authController.login
)

export default router;