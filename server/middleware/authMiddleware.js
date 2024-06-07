const jwt = require("jsonwebtoken");

async function getCookie(req, res, next) {
  try {
    const cookie = req.cookies ? req.cookies.UUID : null;

    if (cookie) {
      // Hide "UT" in .env
      const decoded = jwt.verify(cookie, "UT");
      req.user = decoded;
    } else {
      req.user = {};
    }
    next();
  } catch (err) {
    return res.status(403).json({ message: err.message });
  }
}

module.exports = { getCookie };
