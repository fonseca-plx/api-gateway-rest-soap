import { Options } from "swagger-jsdoc";
import { schemas } from "./schemas";
import { tags } from "./tags";
import path from "path";

export const swaggerOptions: Options = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "API Gateway - REST + SOAP",
      version: "1.0.0",
      description: "Gateway para integração entre API REST e Servidor SOAP."
    },
    servers: [
      { url: "/api", description: "API Gateway" }
    ],
    tags,
    components: {
      schemas
    }
  },
  apis: [
    path.join(__dirname, "../controllers/*.ts"),
    path.join(__dirname, "../controllers/*.js")
  ]
};
