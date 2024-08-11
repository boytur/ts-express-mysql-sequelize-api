import request from "supertest";
import express, { Express } from "express";
import { UserController } from "../user.controller";
import { responseMiddleware } from "../../middleware/responseMiddleware";
import { sequelize } from "../../config/database.config"; // assuming you use Sequelize
import { UserService } from "../../services/user.service";

describe("UserController unit test", () => {
  let app: Express;
  let userController: UserController;

  beforeAll(async () => {
    userController = new UserController();
    app = express();
    app.use(express.json());
    app.use(responseMiddleware);
    app.post("/users", userController.createUser.bind(userController));
  });

  afterAll(async () => {

    const user = await UserService.findByEmail("test@example.com");
    if (user) {
      const userId: number = user.id;
      await UserService.delete(userId);
    } else {
      throw new Error("User was not found in the database after creation.");
    }

    await sequelize.close();
  });

  it("should create a user successfully", async () => {
    const response = await request(app).post("/users").send({
      email: "test@example.com",
      username: "testuser",
      password: "password123",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("success", true);
    expect(response.body.data).toHaveProperty("email", "test@example.com");
    expect(response.body.data).toHaveProperty("username", "testuser");
  });

  it("should return an error if the email is already in use", async () => {
    await request(app).post("/users").send({
      email: "test@example.com",
      username: "testuser2",
      password: "password123",
    });

    const response = await request(app).post("/users").send({
      email: "test@example.com",
      username: "testuser3",
      password: "password123",
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("success", false);
    expect(response.body).toHaveProperty(
      "message",
      "This email is already in use."
    );
  });
});
