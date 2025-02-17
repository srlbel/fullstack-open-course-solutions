import express from "express";
import { calculateBmi } from "./calculateBmi";

const app = express();
const PORT = 3003;

app.get("/hello", (_request, response) => {
  response.send("Hello Full Stack!");
});

app.get("/bmi", (request, response) => {
  const height = Number(request.query.height as string);
  const weight = Number(request.query.weight as string);

  if (
    request.query.height === undefined ||
    request.query.weight === undefined ||
    isNaN(height) ||
    isNaN(weight)
  ) {
    response.status(400).json({ error: "malformatted parameters" });
  }

  const bmi = calculateBmi(height, weight);
  response.json({ height, weight, bmi });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
