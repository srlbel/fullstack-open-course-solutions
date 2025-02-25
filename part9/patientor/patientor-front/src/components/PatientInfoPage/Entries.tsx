import { Diagnosis, Entry } from "../../types";
import { assertNever } from "../../utils";
import HealthCheckEntries from "./HospitalCheck";
import HospitalEntries from "./HospitalEntry";
import OccupationalHealthcare from "./OccupationalHealth";

const Entries = ({
  entry,
  diagnosisList,
}: {
  entry: Entry;
  diagnosisList: Diagnosis[];
}) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntries entry={entry} diagnosisList={diagnosisList} />;
    case "HealthCheck":
      return <HealthCheckEntries entry={entry} diagnosisList={diagnosisList} />;
    case "OccupationalHealthcare":
      return (
        <OccupationalHealthcare entry={entry} diagnosisList={diagnosisList} />
      );
    default:
      return assertNever(entry);
  }
};

export default Entries;
