const express = require("express");
const router = express.Router();
const TrefleApi = require("../../utils/TrefleApi");

const trefleApi = new TrefleApi();

router.get("/", async (req, res) => {
  try {
    const data = await trefleApi.getSomePlants(1);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get("/search/:plant", async (req, res) => {
  const plant = req.params.plant;

  try {
    const data = await trefleApi.findPlants(plant);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
