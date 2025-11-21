import express from "express";
import cors from "cors";
import accountRoutes from "./routes/accountRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/accounts", accountRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`REST API rodando na porta ${PORT}`);
});
