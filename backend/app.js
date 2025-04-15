import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { errHandler } from "./errorHandling/handleErrors.js";
import agencyRouter from "./routes/agencyRoutes.js";
import clientRouter from "./routes/clientRoutes.js";
import dbConnection from "./connections/ConnectDB.js";

dotenv.config({ path: "./config/.env" });

const app = express();
// To process incoming req.
app.use(express.json());

// Routes
app.use("/api/agencies", agencyRouter);
app.use("/api/clients", clientRouter);

// MongoDB Connection
dbConnection();

// Global error handler.
app.use(errHandler);

export default app;
