import { body } from 'express-validator';

export const userValidationRules = () => [
  body('username').notEmpty().withMessage('Username is required').isString().withMessage('Username must be a string'),
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];