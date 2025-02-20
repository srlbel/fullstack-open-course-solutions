import { JSX } from "react";
import Part from "./Part";
import { CoursePart } from "../types";

const Content = ({ parts }: { parts: CoursePart[] }): JSX.Element => {
  return (
    <>
      {parts.map((c) => (
        <Part key={c.name} part={c} />
      ))}
    </>
  );
};

export default Content;
