import express from "express";
const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log("listening on port" + `http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send("working");
});
