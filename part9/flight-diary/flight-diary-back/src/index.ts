import express from "express";
import cors from "cors";

const corsOptions: cors.CorsOptions = {
  origin: ["http://localhost:5173", "http://localhost:3000"],
};

const app = express();
import diaryRouter from "./routes/diaries";
app.use(express.json());
app.use(cors(corsOptions));

const PORT = 3000;

app.get("/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use("/api/diaries", diaryRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
