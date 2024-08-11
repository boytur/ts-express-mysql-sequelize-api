import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

/**
 * Configuration for the database connection.
 *
 * @remarks
 * This configuration specifies the necessary parameters for connecting to a PostgreSQL database using Sequelize.
 * It uses environment variables to set the host, username, password, database name, and port.
 *
 * @see {@link https://sequelize.org/ | Sequelize}
 */

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT!),
});
