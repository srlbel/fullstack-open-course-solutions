import express, { Response } from "express";
import type { DiagnosesEntry } from "../types";
import diagnosisService from "../services/diagnoses";

const router = express.Router();

router.get("/", (_req, res: Response<DiagnosesEntry[]>) => {
  res.send(diagnosisService.getDiagnosis());
});

export default router;
