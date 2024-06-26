const express = require("express");
const mongoose = require("mongoose");
const app = express();

const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require("dotenv").config();

PORT = process.env.PORT;
dbUrl = process.env.DB_URL;

mongoose.connect(dbUrl);

const con = mongoose.connection;

try {
  con.on("open", () => {
    console.log("mongoDB connected!!!");
  });
} catch (error) {
  console.log("Error: " + error);
}
const userRouter = require("./router/User");
app.use("/api", userRouter);

app.get("/", (req, res) => {
  res.send("welcome");
});
app.listen(PORT, () => {
  console.log("This Node application is running on port " + PORT);
});
