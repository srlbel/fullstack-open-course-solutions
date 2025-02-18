import patientData from "../data/patients.json";
import type { NonSensitivePatientEntry, PatientEntry } from "../types";

const getPatients = (): PatientEntry[] => patientData;

const getNonSensitivePatients = (): NonSensitivePatientEntry[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default {
  getPatients,
  getNonSensitivePatients,
};
