import express from 'express';
import morgan from 'morgan';
import userRoutes from './routes/user.routes';
import { sequelize } from './config/database.config';
import { errorHandler } from './middleware/errorHandler';
import dotenv from 'dotenv';
import { responseMiddleware } from './middleware/responseMiddleware';
import { User } from './models/user.model';
import authRouter from './routes/auth.route';
import cookieParser from'cookie-parser';
import todoRoutes from  './routes/todo.routes';
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Middleware for logging requests
app.use(morgan('dev'));
app.use(cookieParser());

// Middleware for adding user to request
app.use(responseMiddleware); 

// Middleware for parsing JSON bodies
app.use(express.json());

// Routes
app.use('/api', userRoutes);
app.use('/api', todoRoutes);
app.use('/auth',authRouter);

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

// Error handling middleware
app.use(errorHandler);

// Connect to the database and start the server
sequelize.authenticate()
  .then(() => {
    console.log('Database connected...');
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
