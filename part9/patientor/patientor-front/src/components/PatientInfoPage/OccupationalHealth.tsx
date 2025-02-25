import { Diagnosis, OccupationalHealthcareEntry } from "../../types";
import { Typography, Box } from "@mui/material";
import DiagnosisList from "./DiagnosisList";
import WorkIcon from "@mui/icons-material/Work";

const OccupationalHealthcare = ({
  entry,
  diagnosisList,
}: {
  entry: OccupationalHealthcareEntry;
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
        {entry.date}
        <WorkIcon />
        {entry.employerName}
      </Typography>
      <Typography style={{ fontStyle: "italic" }}>
        {entry.description}
      </Typography>

      {entry.sickLeave && (
        <Typography>
          Sick leave from: {entry.sickLeave?.startDate} to{" "}
          {entry.sickLeave?.endDate}
        </Typography>
      )}

      <DiagnosisList
        diagnosisList={diagnosisList}
        diagnosisCodes={entry.diagnosisCodes}
      />
      <Typography>diagnose by {entry.specialist}</Typography>
    </Box>
  );
};

export default OccupationalHealthcare;
