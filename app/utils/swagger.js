import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const swaggerSpec = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "The coolest API",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        basicAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter 'Bearer' followed by a space and the JWT token",
          in: "header",
        },
      },
      security: {
        basicAuth: [],
      },
    },

    servers: [
      {
        url: "http://localhost:8000",
      },
    ],
  },
  apis: [`${path.join(__dirname, "../routes/user_router.js")}`],
};

export default swaggerSpec;
