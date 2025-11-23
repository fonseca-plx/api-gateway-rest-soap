import { Options } from "swagger-jsdoc";
import { schemas } from "./schemas";
import { tags } from "./tags";

export const swaggerOptions: Options = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "API Gateway - REST + SOAP",
      version: "1.0.0",
      description: "Gateway para integração entre API REST e Servidor SOAP."
    },
    servers: [
      { url: "http://localhost:3000/api", description: "API Gateway Local" }
    ],
    tags,
    components: {
      schemas
    }
  },
  apis: ["./src/controllers/*.ts"]
};
