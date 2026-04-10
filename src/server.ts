import "express-async-errors";
import express from "express";
import cors from "cors";
import { router } from "./routes";
import { swaggerSpec } from "./docs/swagger";
import swaggerUi from "swagger-ui-express";

const app = express();

app.use(cors());
app.use(express.json());

app.use(router);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware de erro global
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err);

  return res.status(500).json({
    error: "Internal server error",
  });
});

app.listen(3333, () => {
  console.log("🚀 Server running on port 3333");
});
