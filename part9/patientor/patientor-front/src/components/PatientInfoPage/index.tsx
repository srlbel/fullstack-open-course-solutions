import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Gender, Patient } from "../../types";
import { useParams } from "react-router-dom";
import patients from "../../services/patients";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";

const PatientInfoPage = () => {
  const id = useParams().id as string;

  const [info, setInfo] = useState<Patient>({
    id,
    gender: Gender.Other,
    name: "",
    occupation: "",
    dateOfBirth: "1-1-2000",
    ssn: "",
  });

  useEffect(() => {
    const fetchPatientInfo = async () => {
      const data = await patients.getOne(id);
      setInfo(data);
    };

    fetchPatientInfo();
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
    </div>
  );
};

export default PatientInfoPage;
