import {
  CreateAgency,
  getAgency,
  getAgencyById,
  updateAgencyById,
  deleteAgencyById,
} from "../controllers/agencyController.js";
import express from "express";

const agencyRouter = express.Router();

agencyRouter.post("/", CreateAgency);
agencyRouter.get("/", getAgency);
agencyRouter.get("/:id", getAgencyById);
agencyRouter.put("/:id", updateAgencyById);
agencyRouter.delete("/:id", deleteAgencyById);

export default agencyRouter;
