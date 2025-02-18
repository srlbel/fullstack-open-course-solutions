import express, { Response } from "express";
import type { NonSensitivePatientEntry } from "../types";
import patientsService from "../services/patients";

const routes = express.Router();

routes.get("/", (_req, res: Response<NonSensitivePatientEntry[]>) => {
  res.send(patientsService.getNonSensitivePatients());
});

export default routes;
