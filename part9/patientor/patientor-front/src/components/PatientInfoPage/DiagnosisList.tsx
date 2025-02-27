import { Diagnosis } from "../../types";
import { Typography } from "@mui/material";

const DiagnosisList = ({
  diagnosisList,
  diagnosisCodes,
}: {
  diagnosisList: Diagnosis[];
  diagnosisCodes?: string[];
}) => {
  if (!diagnosisCodes)
    return <Typography padding={5}>No diagnosis available.</Typography>;

  return (
    <ul>
      {diagnosisCodes.map((code) => {
        const diag = diagnosisList.find((d) => d.code === code);
        return (
          <Typography key={code}>
            {diag ? `${diag.code} ${diag.name}` : `${code}`}
          </Typography>
        );
      })}
    </ul>
  );
};

export default DiagnosisList;
