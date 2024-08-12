import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Load the environment variable for the current environment
const environment = process.env.NODE_ENV || "development";

// Define the configuration object for different environments
const config: { [key: string]: any } = {
  development: {
    username: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
    host: process.env.DB_HOST!,
    dialect: "mysql",
  },
  test: {
    username: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
    host: process.env.DB_HOST!,
    dialect: "mysql",
  },
  production: {
    username: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
    host: process.env.DB_HOST!,
    dialect: "mysql",
  },
};

// Get the configuration for the current environment
const currentConfig = config[environment];

// Create a new Sequelize instance using the current configuration
export const sequelize = new Sequelize(
  currentConfig.database,
  currentConfig.username,
  currentConfig.password,
  {
    host: currentConfig.host,
    dialect: currentConfig.dialect,
  }
);
