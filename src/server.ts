import "express-async-errors";
import express from "express";
import cors from "cors";
import { router } from "./routes";
import { swaggerSpec } from "./docs/swagger";
import swaggerUi from "swagger-ui-express";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000", // local
      "exam-management-system-frontend-phi.vercel.app", // produção
    ],
    credentials: true,
  }),
);
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

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
