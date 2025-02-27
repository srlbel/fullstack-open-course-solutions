import express, { Response } from "express";
import type { NonSensitivePatientEntry, PatientEntry } from "../types";
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

routes.get("/:id", (req, res) => {
  const { id } = req.params;
  const patient: PatientEntry | undefined = patientsService.getOnePatient(id);

  if (!patient) res.status(404).json({ error: "patient not found" });

  res.json(patient);
});

export default routes;
