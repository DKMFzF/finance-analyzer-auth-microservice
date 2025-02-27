# Auth Microservice for the Finance Analyzer project

[дока на русском](./docs/README.ru.md)

_The micromicroservice is designed for authentication and authorization in the Finance Analyzer project, but it can also be used in other projects. To integrate, it is enough to configure your environment._

## Description
The Auth microservice is responsible for user authentication and authorization. It provides an API for logging in, validating tokens, and securing routes. The microservice uses JWT for token management and Redis for data caching.

## Functionality
- **Authentication** via JWT.
- **Route protection** with token verification.
- **Caching** data using Redis.
- **Logging** requests and errors.
- **Error handling** with centralized middleware.
- **Integration with User Service** to verify user data.

## Technologies used
- **Node.js** + **Express** is the main framework.
- **JWT** – for token management.
- **Redis** – data caching.
- **Axios** – for interacting with the User Service.
- **Winston** – logging.
- **Helmet** and **Compression** – protection and optimization.
- **Swagger** – API documentation.

## Project structure
``
api-gateway/
│── src/
,── config/ # Configuration files
│ ├── middleware/ # Middleware (logging, errors, limits)
│ ├── monitoring/ # Monitoring (OpenTelemetry)
│ ├── routes/           # API routes
│   ├── utils/            # Utilities and constants
│   ├── app.ts # Main Application
,── server.ts # Starting the server
│── docker-compose.yml # Containerization
,── README.md # Project Description
```

## Installation and launch
### Local launch
```bash
yarn install
yarn start
```

### Launching in Docker
```bash
docker-compose up --build
```

## Environment variables (.env)
The environment variable is specially created and is not hidden. 
```
PORT=3000
SECRET_KEY=supersecret
USER_SERVICE_URL=http://user-service:4000
USER_SERVICE_URL_CHECK_USER=/check-user
USER_SERVICE_URL_LOGIN=/login
USER_SERVICE_URL_PROTECTED=/protected
```

## API Routes
### Authentication
- **POST** `/login` – JWT login.
- **GET** `/protected` – Token verification (cached in Redis).

### User Service
- **POST** `/user/register` – User registration.

## Monitoring
The microservice supports logging via Winston. Logs are saved to files and output to the console.

## Author

[Kirill Doroshev (DKMFzF)](https://vk.com/dkmfzf )

## License
MIT