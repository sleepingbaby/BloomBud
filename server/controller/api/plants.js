const express = require("express");
const router = express.Router();
const TrefleApi = require("../../utils/TrefleApi");
const Plant = require("../../models/plant.js");
const User = require("../../models/user.js");
const { getCookie } = require("../../middleware/authMiddleware");

const trefleApi = new TrefleApi();

router.get("/", async (req, res) => {
  try {
    const data = await trefleApi.getSomePlants(1);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get("/userplants", getCookie, async (req, res) => {
  try {
    const userId = req.user.userId;
    const userPlants = await User.findById(userId).populate("plants");
    const plants = userPlants.plants;

    res.json(plants);
  } catch (err) {
    console.error(err);
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

router.post("/add", getCookie, async (req, res) => {
  try {
    const { name, scientific_name, img } = req.body;
    const userId = req.user.userId;

    const newPlant = new Plant({
      name,
      scientific_name,
      img,
    });

    const plant = await newPlant.save();
    const plantId = plant._id;

    const user = await User.findById(userId);
    user.plants.push(plantId);

    await user.save();
    res.status(201).json({ message: "Plant added successfully" });
  } catch (err) {
    console.error({ message: err });
  }
});

router.delete("/delete/:id", getCookie, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;
    const deletedPlant = Plant.findOneAndDelete(id);

    if (!deletedPlant) {
      return res.status(404).json({ messaage: "Plant not found" });
    }

    const user = await User.findById(userId);
    user.plants.pull(id);
    await user.save();

    return res.status(200).json({ message: "Plant Deleted" });
  } catch (err) {
    console.error({ message: err });
  }
});

module.exports = router;
