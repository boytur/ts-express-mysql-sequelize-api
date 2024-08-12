import { Request, Response } from 'express';
import { CustomResponse } from '../middleware/responseMiddleware';
import { UserService } from '../services/user.service';
import { comparePassword } from '../utils/encrypt';
import { IUser } from '../interfaces/User.interface';
import jwt from 'jsonwebtoken';



/**
 * Logs in a user.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns A Promise that resolves to void.
 * @throws If an error occurs during the login process.
 */
export class authController {
    static async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body
            const existingUser = await UserService.findByEmail(email);

            if (!existingUser) {
                (res as CustomResponse).customError('พ่อมึงไอ้เหี้ยมึงเป็นใคร', 401)
                return;
            }

            const compare = await comparePassword(password, existingUser.password)

            if (!compare) {
                (res as CustomResponse).customError('ควยเถอะรหัสผิดเย็ดแม่', 400)
                return
            }

            const payload = {
                id: existingUser.id,
                username: existingUser.username,
                email: existingUser.email
            };

            const token = await jwt.sign(payload, `${process.env.JWT_SECRET}`);

   
            res.cookie("moa_cookie", token, { httpOnly: true, secure: true });
            (res as CustomResponse).customSuccess({ existingUser, token }, 200, 'สวัสดีครับ')
            return;
        }
        catch (error: any) {
            (res as CustomResponse).customError(error.message, 500);
        }
    }
}
