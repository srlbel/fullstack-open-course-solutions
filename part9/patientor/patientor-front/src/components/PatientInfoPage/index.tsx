import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Diagnosis, Gender, Patient } from "../../types";
import { useParams } from "react-router-dom";
import patients from "../../services/patients";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import diagnosis from "../../services/diagnosis";
import Entries from "./Entries";

const PatientInfoPage = () => {
  const id = useParams().id as string;

  const [info, setInfo] = useState<Patient>({
    id,
    gender: Gender.Other,
    name: "",
    occupation: "",
    dateOfBirth: "",
    ssn: "",
    entries: [],
  });

  const [diagnosisList, setDianosisList] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchPatientInfo = async () => {
      const data = await patients.getOne(id);
      setInfo(data);
    };

    const fetchDianosisInfo = async () => {
      const data = await diagnosis.getAll();
      setDianosisList(data);
    };

    fetchPatientInfo();
    fetchDianosisInfo();
  }, []);

  return (
    <div>
      <Box>
        <Typography variant="h5" marginTop={5} fontWeight={600}>
          {info.name}
          {info.gender == Gender.Male ? <MaleIcon /> : <FemaleIcon />}
        </Typography>
      </Box>
      <Box marginTop={2}>
        <Typography>ssn: {info.ssn}</Typography>
        <Typography>occupation: {info.occupation}</Typography>
      </Box>

      <Box marginTop={2}>
        <Typography variant="h6" fontWeight={600}>
          entries
        </Typography>

        <Box padding={2}>
          {info.entries.length === 0 ? (
            <Typography>No entries available.</Typography>
          ) : (
            info.entries.map((entry) => (
              <Entries
                entry={entry}
                key={entry.id}
                diagnosisList={diagnosisList}
              />
            ))
          )}
        </Box>
      </Box>
    </div>
  );
};

export default PatientInfoPage;
