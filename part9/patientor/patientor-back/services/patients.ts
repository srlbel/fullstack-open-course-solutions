import patientData from "../data/patients.json";
import type {
  NonSensitivePatientEntry,
  PatientEntry,
  NoIdPatient,
  Entry,
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
    ...patient,
    id: uuid(),
    entries: [] as Entry[],
  };

  patientData.push(newPatient);

  return newPatient;
};

const getOnePatient = (id: string): PatientEntry | undefined => {
  return patientData.find((patient) => patient.id === id);
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
  getOnePatient,
};
