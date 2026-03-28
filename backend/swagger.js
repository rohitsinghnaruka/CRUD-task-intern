const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CRUD Task Manager API',
      version: '1.0.0',
      description:
        'A scalable REST API with JWT Authentication, Role-Based Access Control, and full CRUD operations on Tasks. Built with Express.js, MongoDB, and MVC architecture.',
      contact: {
        name: 'Rohit Singh Naruka',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development Server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    tags: [
      { name: 'Auth', description: 'Authentication & User management' },
      { name: 'Tasks', description: 'CRUD operations on tasks' },
      { name: 'Admin', description: 'Admin-only operations' },
    ],
  },
  apis: ['./src/routes/v1/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
