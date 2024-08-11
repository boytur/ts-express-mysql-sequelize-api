import { User } from "../models/user.model";
import { hashPassword } from "../utils/encrypt";

/**
 * The UserService class provides methods for creating, finding, updating, and deleting users.
 */
export class UserService {
  static async create(userData: any): Promise<User> {
    const hashedPassword = await hashPassword(userData.password);
    const user = {
      ...userData,
      password: hashedPassword,
    };
  
    return User.create(user);
  }

  static async findByEmail(email: string): Promise<User | null> {
    return User.findOne({ where: { email } });
  }

  static async findById(id: number): Promise<User | null> {
    return User.findByPk(id);
  }

  static async update(id: number, userData: any): Promise<User | null> {
    const user = await User.findByPk(id);
    if (user) {
      await user.update(userData);
      return user;
    }
    return null;
  }

  static async delete(id: number): Promise<boolean> {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      return true;
    }
    return false;
  }

  static async getUsers(limit: number, offset: number): Promise<User[]> {
    return User.findAll({
      limit,
      offset,
      attributes: { exclude: ["password"] },
    }) || [];
  }

  static async getTotalUserCount(): Promise<number> {
    return User.count();
  }
}
