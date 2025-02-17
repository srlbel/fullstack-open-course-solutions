import express from "express";
import { calculateBmi } from "./calculateBmi";
import { exerciseCalculator } from "./exerciseCalculator";

interface Exercises {
  daily_exercises: number[];
  target: number;
}

const app = express();
app.use(express.json());
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

app.post("/exercises", (request, response) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target }: Exercises = request.body;

  if (!daily_exercises || !target)
    response.status(404).json({ error: "parameters missing" });

  if (typeof target != "number")
    response.status(404).json({ error: "malformatted parameters" });

  if (
    !Array.isArray(daily_exercises) ||
    !daily_exercises.every((num) => typeof num === "number")
  )
    response.status(400).json({ error: "malformatted parameters" });

  const result = exerciseCalculator({ days: daily_exercises, target });
  response.json(result);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
