import diagnosesData from "../data/diagnoses.json";
import type { DiagnosesEntry } from "../types";

const diagnoses: DiagnosesEntry[] = diagnosesData;

const getDiagnosis = (): DiagnosesEntry[] => diagnoses;

export default {
  getDiagnosis,
};
