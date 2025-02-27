import { Diagnosis, HealthCheckEntry, HealthCheckRating } from "../../types";
import { Box, Typography } from "@mui/material";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import DiagnosisList from "./DiagnosisList";
import FavoriteIcon from "@mui/icons-material/Favorite";

const ratingColors = {
  [HealthCheckRating.Healthy]: "green",
  [HealthCheckRating.LowRisk]: "yellow",
  [HealthCheckRating.HighRisk]: "orange",
  [HealthCheckRating.CriticalRisk]: "red",
};

const HealthCheckEntries = ({
  entry,
  diagnosisList,
}: {
  entry: HealthCheckEntry;
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
        {entry.date} <FactCheckIcon />
      </Typography>
      <Typography style={{ fontStyle: "italic" }}>
        {entry.description}
      </Typography>
      <Typography>
        Health Check Rating:{" "}
        <FavoriteIcon sx={{ color: ratingColors[entry.healthCheckRating] }} />{" "}
      </Typography>
      <DiagnosisList
        diagnosisList={diagnosisList}
        diagnosisCodes={entry.diagnosisCodes}
      />
      <Typography>diagnose by {entry.specialist}</Typography>
    </Box>
  );
};

export default HealthCheckEntries;
