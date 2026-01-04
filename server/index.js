import mongoose from "mongoose";
import 'dotenv/config'
import app from './app.js'
const port = process.env.PORT;

mongoose
  .connect("mongodb://127.0.0.1:27017/SmartQueue")
  .then(() => {
    app.listen(port, () => {
      console.log("listening on port" + `http://localhost:${port}`);
    });
    console.log("connected with database");

  })
  .catch((err) => console.log(err));
