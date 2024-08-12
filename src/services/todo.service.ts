import { Todo } from "../models/todo.model";

export class TodoService {
    // Create a new todo
    static async create(todoData: any): Promise<Todo> {
        return Todo.create(todoData);
    }

    // Find a todo by its ID
    static async findById(id: number): Promise<Todo | null> {
        return Todo.findByPk(id);   
    }

    // Update a todo by its ID
    static async update(id: number, todoData: any): Promise<Todo | null> {
        const todo = await Todo.findByPk(id);
        if (todo) {
            return todo.update(todoData);
        }
        return null;
    }

    // Delete a todo by its ID
    static async delete(id: number): Promise<boolean> {
        const todo = await Todo.findByPk(id);
        if (todo) {
            await todo.destroy();
            return true;
        }
        return false;
    }

    // Get a list of todos with pagination and filtering by user ID
    static async getTodos(limit: number, offset: number, userId: number): Promise<Todo[]> {
        return Todo.findAll({
            where: { userId },
            limit,
            offset,
        }) || [];
    }

    // Get the total count of todos
    static async getTotalTodoCount(): Promise<number> {
        return Todo.count();
    }
}