import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database.config';

/**
 * Represents a User model.
 * 
 * @remarks
 * This class is used to define the structure of a user object.
 * 
 * @public
 */

export class User extends Model {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'users'
});
