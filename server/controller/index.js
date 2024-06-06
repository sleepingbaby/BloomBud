const express = require("express");
const router = express.Router();

const userAuth = require("./api/users.js");
const plants = require("./api/plants.js");

router.use("/users", userAuth);
router.use("/plants", plants);

module.exports = router;
