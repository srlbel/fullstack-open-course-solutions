import express, { Response } from "express";
import type { NonSensitivePatientEntry } from "../types";
import patientsService from "../services/patients";
import { toNewPatient } from "../utils";
import { z } from "zod";

const routes = express.Router();

routes.get("/", (_req, res: Response<NonSensitivePatientEntry[]>) => {
  res.send(patientsService.getNonSensitivePatients());
});

routes.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientsService.addPatient(newPatient);

    res.json(addedPatient);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: "unknown error" });
    }
  }
});

export default routes;
