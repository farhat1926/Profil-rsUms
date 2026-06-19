const express = require("express");
const router = express.Router();
const {
  trackVisitor,
  getVisitorStats,
} = require("../controllers/VisitorController");

router.post("/track", trackVisitor);
router.get("/stats", getVisitorStats);

module.exports = router;
