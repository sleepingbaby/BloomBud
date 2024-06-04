const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const TrefleApi = require("./utils/TrefleApi");

const trefleApi = new TrefleApi();
app.get("/plants", async (req, res) => {
  try {
    const data = await trefleApi.getSomePlants();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to MongoDB"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
}

app.listen(PORT, async () => {
  console.log("Server running on port: " + PORT);
});
