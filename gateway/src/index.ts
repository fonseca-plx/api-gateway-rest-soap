import express from "express";
import cors from "cors";
import gatewayRoutes from "./routes/gatewayRoutes";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { swaggerOptions } from "./docs/swaggerOptions";

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const specs = swaggerJsdoc(swaggerOptions);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/api", gatewayRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API Gateway rodando na porta ${PORT}`);
  console.log(`Swagger UI: http://localhost:${PORT}/docs`);
});
