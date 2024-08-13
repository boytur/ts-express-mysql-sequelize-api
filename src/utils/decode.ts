import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';


export const getUserId = async (cookie: string): Promise<number> => {
  try {
    // Extract token from the cookie (assuming cookie format is 'token=<JWT>')
    const token = cookie;
    
    if (!token) {
      console.log('No token provided');
      throw new Error('No token provided')
    }

    // Decode and verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as User;

    // Return the user ID from the decoded token
    return decoded.id;
  } catch (err) {
    console.log('Error decoding token:', err);
    throw new Error((err as Error).message);
  }
};
