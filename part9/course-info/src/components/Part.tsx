import { CoursePart } from "../types";

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case "basic":
      return (
        <p>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>{" "}
          <br />
          <i>{part.description}</i>
        </p>
      );
    case "group":
      return (
        <p>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>{" "}
          <br />
          project exercises {part.groupProjectCount}
        </p>
      );
    case "background":
      return (
        <p>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>{" "}
          <br />
          <i>{part.description}</i> <br />
          Background material:{" "}
          <a href={part.backgroundMaterial}>{part.backgroundMaterial}</a>
        </p>
      );
    case "special":
      return (
        <p>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>{" "}
          <br />
          <i>{part.description}</i> <br />
          Requirements: {part.requirements.join(", ")}
        </p>
      );
    default:
      return null;
  }
};

export default Part;
