# RESTful  Express TypeScript Sequelize PostgreSQL

This repository provides a template for building a RESTful API using Express.js, TypeScript, Sequelize ORM, and PostgreSQL. It includes a Docker setup for development environments.

## Features

- **Express.js**: Web framework for building APIs
- **TypeScript**: Strongly typed language for JavaScript
- **Sequelize**: ORM for PostgreSQL
- **PostgreSQL**: Relational database
- **Docker**: Containerization for development and production
- **JWT**: Simple and secure user authentication
- **Validation**: Request validation using custom middleware

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/boytur/ts-express-postgres-sequelize-api.git
    cd ts-express-postgres-sequelize-api
    ```

2. Copy the `.env.example` file to `.env` and adjust the configuration as needed:

    ```bash
    cp .env.example .env
    ```

3. Build and run the Docker containers:

    ```bash
    docker-compose up --build
    ```

4. Access the API at `http://localhost:3000`.

### Development

To run the application locally without Docker:

1. Install dependencies:

    ```bash
    npm install
    ```

2. Build the TypeScript code:

    ```bash
    npm run build
    ```

3. Start the application:

    ```bash
    npm start
    ```

### Testing

To run tests, add your test scripts to the `package.json` and run:

```bash
npm test
```

### Project structure
```
ts-express-postgres-sequelize-api
 ┣ src
 ┃ ┣ controllers
 ┃ ┃ ┣ user.controller.ts
 ┃ ┣ models
 ┃ ┃ ┣ user.model.ts
 ┃ ┣ services
 ┃ ┃ ┣ user.service.ts
 ┃ ┣ routes
 ┃ ┃ ┣ user.routes.ts
 ┃ ┣ middleware
 ┃ ┃ ┣ auth.middleware.ts
 ┃ ┣ utils
 ┃ ┃ ┣ validators.ts
 ┃ ┃ ┣ encrypt.ts   
 ┃ ┣ config
 ┃ ┃ ┣ database.config.ts
 ┃ ┣ index.ts
 ┃ ┣ app.ts
 ┣ .env
 ┣ .gitignore
 ┣ Dockerfile
 ┣ docker-compose.yml
 ┣ package.json
 ┣ tsconfig.json
 ┣ README.md
```