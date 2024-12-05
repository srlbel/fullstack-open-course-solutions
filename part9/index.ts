import express from "express";

const app = express();
const PORT = 3003;

app.get("/hello", (_request, response) => {
  response.send("Hello Full Stack!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
