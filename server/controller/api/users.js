const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const User = require("../../models/user.js");
const { getCookie } = require("../../middleware/authMiddleware.js");

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = new User({
    email: email,
    password: hashedPassword,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "No user found" });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).json({ message: "Invalid Email or Password " });
    } else {
      const token = jwt.sign({ userId: user._id }, "UT", {
        expiresIn: "1d",
      });

      res.cookie("UUID", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      });

      return res.status(200).json("Successfully logged in");
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("UUID");
  return res.status(200).json({ message: "Successfully logged out" });
});

router.get("/authenticate", getCookie, async (req, res) => {
  try {
    if (req.user.userId) {
      return res.status(200).json({ logged_in: true });
    } else {
      return res.status(400).json({ logged_in: false });
    }
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
