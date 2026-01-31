import mongoose from "mongoose";
import 'dotenv/config'
import app from './app.js'
const port = process.env.PORT;

mongoose
  .connect("mongodb+srv://rishikm215_db_user:DYyKbq7EMKvH5Xq7@smartqueue.xt7zono.mongodb.net/?appName=SmartQueue")
  .then(() => {
    app.listen(port, () => {
      console.log("listening on port" + `http://localhost:${port}`);
    });
    console.log("connected with database");

  })
  .catch((err) => console.log(err));
