const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
const routes = require("./controller");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to MongoDB"));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
}

app.use(routes);

app.listen(PORT, async () => {
  console.log("Server running on port: " + PORT);
});
