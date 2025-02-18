import patientData from "../data/patients.json";
import type {
  NonSensitivePatientEntry,
  PatientEntry,
  NoIdPatient,
} from "../types";
import { v1 as uuid } from "uuid";

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

const addPatient = (patient: NoIdPatient): PatientEntry => {
  const newPatient: PatientEntry = {
    id: uuid(),
    ...patient,
  };

  patientData.concat(newPatient);

  return newPatient;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
};
