import { Box, Typography } from "@mui/material";
import { Diagnosis, HospitalEntry } from "../../types";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import DiagnosisList from "./DiagnosisList";

const HospitalEntries = ({
  entry,
  diagnosisList,
}: {
  entry: HospitalEntry;
  diagnosisList: Diagnosis[];
}) => {
  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        borderRadius: 2,
        padding: 2,
        marginBottom: 2,
      }}
    >
      <Typography>
        {entry.date} <MedicalServicesIcon />
      </Typography>
      <Typography style={{ fontStyle: "italic" }}>
        {entry.description}
      </Typography>
      <Typography>
        {entry.discharge.criteria} at {entry.discharge.date}
      </Typography>
      <DiagnosisList
        diagnosisList={diagnosisList}
        diagnosisCodes={entry.diagnosisCodes}
      />
      <Typography>diagnose by {entry.specialist}</Typography>
    </Box>
  );
};

export default HospitalEntries;
