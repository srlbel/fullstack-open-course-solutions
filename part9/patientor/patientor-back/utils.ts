import { z } from "zod";
import { NoIdPatient } from "./types";

export const toNewPatient = (object: unknown): NoIdPatient => {
  if (!object || typeof object != "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "gender" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "occupation" in object &&
    "entries" in object
  ) {
    const newEntry: NoIdPatient = {
      name: z.string().parse(object.name),
      dateOfBirth: z.string().date().parse(object.dateOfBirth),
      gender: z.string().parse(object.gender),
      occupation: z.string().parse(object.occupation),
      ssn: z.string().parse(object.ssn),
      entries: z.array(z.object({ type: z.string() })).parse(object.entries),
    };

    return newEntry;
  }

  throw new Error("Incorrent data: some fields are missing");
};
