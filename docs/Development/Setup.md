# Development Setup

This guide will help you set up the Rago Meditation Server for local development.

## Prerequisites

- Node.js 18.x or later
- npm 9.x or later (comes with Node.js)
- MongoDB 6.0 or later
- Redis 7.0 or later (for caching and rate limiting)
- Git

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/Bytefield/meditacion_app_server.git
   cd meditacion_app_server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Copy the example environment file and update the values:
   ```bash
   cp .env.example .env
   ```

4. **Configure the environment**
   Edit the `.env` file with your configuration:
   ```env
   NODE_ENV=development
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/meditation_dev
   JWT_SECRET=your_jwt_secret_here
   JWT_ACCESS_EXPIRATION_MINUTES=15
   JWT_REFRESH_EXPIRATION_DAYS=30
   REDIS_URL=redis://localhost:6379
   CORS_ORIGIN=http://localhost:3001
   ```

## Database Setup

1. **Install MongoDB**
   - [Download and install MongoDB Community Edition](https://www.mongodb.com/try/download/community)
   - Start the MongoDB service

2. **Install Redis**
   - [Download and install Redis](https://redis.io/download)
   - Start the Redis server

## Running the Application

1. **Start the development server**
   ```bash
   npm run dev
   ```
   This will start the server with nodemon for automatic reloading.

2. **Run tests**
   ```bash
   npm test
   ```

3. **Run linter**
   ```bash
   npm run lint
   ```

4. **Format code**
   ```bash
   npm run format
   ```

## Project Structure

```
meditacion_app_server/
├── config/           # Configuration files
│   └── db.js         # Database connection
├── controllers/       # Route controllers
│   ├── authController.js
│   └── userController.js
├── middleware/        # Custom middleware
│   ├── auth.js
│   └── error.js
├── models/            # Mongoose models
│   └── User.js
├── routes/            # API routes
│   └── authRoutes.js
├── services/          # Business logic
│   └── userService.js
├── utils/             # Utility functions
│   ├── logger.js
│   └── apiError.js
├── .env.example      # Example environment variables
├── .eslintrc.js      # ESLint configuration
├── .prettierrc       # Prettier configuration
├── app.js            # Express app setup
├── package.json
└── server.js         # Server entry point
```

## API Documentation

The API documentation is automatically generated from JSDoc comments. To view it:

1. Start the development server
2. Visit `http://localhost:3000/api-docs`

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run a specific test file
npm test -- path/to/test/file.test.js

# Run tests with coverage
npm run test:coverage
```

### Writing Tests

- Test files should be named `*.test.js`
- Place test files next to the code they test
- Use the following structure:

```javascript
const request = require('supertest');
const app = require('../../app');

describe('Auth API', () => {
  describe('POST /api/v1/auth/register', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/api/v1/auth/register')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123',
        });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('data.user');
    });
  });
});
```

## Code Style

- Follow [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- Use ES6+ features
- Use async/await for asynchronous code
- Use meaningful variable and function names
- Write JSDoc comments for all functions

## Git Workflow

1. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write tests for new features
   - Update documentation
   - Follow the code style

3. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

4. **Push your changes**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a pull request**
   - Go to the repository on GitHub
   - Click "New pull request"
   - Follow the PR template
   - Request reviews from team members

## Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| NODE_ENV | Node environment | development | No |
| PORT | Port to run the server on | 3000 | No |
| MONGODB_URI | MongoDB connection string | - | Yes |
| JWT_SECRET | Secret for JWT signing | - | Yes |
| JWT_ACCESS_EXPIRATION_MINUTES | JWT access token expiration | 15 | No |
| JWT_REFRESH_EXPIRATION_DAYS | JWT refresh token expiration | 30 | No |
| REDIS_URL | Redis connection URL | - | Yes |
| CORS_ORIGIN | Allowed CORS origins | * | No |

## Troubleshooting

### MongoDB Connection Issues
- Make sure MongoDB is running
- Check the connection string in `.env`
- Try connecting with MongoDB Compass or `mongo` shell

### Redis Connection Issues
- Make sure Redis is running
- Check the Redis URL in `.env`
- Try connecting with `redis-cli`

### Port Already in Use
```bash
# Find the process using the port
lsof -i :3000

# Kill the process
kill -9 <PID>
```

## Dependencies

### Production Dependencies
- `express`: Web framework
- `mongoose`: MongoDB ODM
- `jsonwebtoken`: JWT implementation
- `bcryptjs`: Password hashing
- `redis`: Caching and rate limiting
- `cors`: CORS middleware
- `helmet`: Security headers
- `winston`: Logging

### Development Dependencies
- `nodemon`: Development server
- `jest`: Testing framework
- `supertest`: HTTP assertions
- `eslint`: Linting
- `prettier`: Code formatting
- `husky`: Git hooks
- `lint-staged`: Lint staged files

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
