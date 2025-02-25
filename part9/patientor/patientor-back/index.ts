import express from "express";
import cors from "cors";
import diagnosisRouter from "./routes/diagnosesRoutes";
import patientsRouter from "./routes/patientsRoutes";

const PORT = 3000;

const corsOptions: cors.CorsOptions = {
  origin: ["http://localhost:5173", "http://localhost:3000"],
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use("/api/diagnosis", diagnosisRouter);
app.use("/api/patients", patientsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
