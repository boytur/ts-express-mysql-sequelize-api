import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database.config';
import { User } from './user.model';

/**
 * Represents a User model.
 * 
 * @remarks
 * This class is used to define the structure of a user object.
 * 
 * @public
 */

/**
 * Represents a Todo item.
 */
export class Todo extends Model {
  public id!: number;
  public name!: string;
  public userId!: number;
}

Todo.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId:{
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'todos'
});

Todo.belongsTo(User, {
  foreignKey: 'userId',
  targetKey: 'id'
});
