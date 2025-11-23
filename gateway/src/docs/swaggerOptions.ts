import { Options } from "swagger-jsdoc";

export const swaggerOptions: Options = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "API Gateway - REST + SOAP",
      version: "1.0.0",
      description: "Gateway que orquestra a REST API (accounts) e o SOAP server (files)."
    },
    servers: [
      { url: "http://localhost:3000/api", description: "Local gateway" }
    ]
  },
  apis: ["./src/controllers/*.ts"] // JSDoc no controller
};
