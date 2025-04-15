import express from "express";
import {
  createClient,
  getClient,
  getClientById,
  updateClientById,
  deleteClientById,
} from "../controllers/clientController.js";

const clientRouter = express.Router();

clientRouter.post("/", createClient);
clientRouter.get("/", getClient);
clientRouter.get("/:id", getClientById);
clientRouter.put("/:id", updateClientById);
clientRouter.delete("/:id", deleteClientById);

export default clientRouter;
