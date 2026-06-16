const express = require("express");
const router = express.Router();
const reelController = require("../controllers/reelsController");

// Rute untuk mengelola Reels
router.post("/", reelController.createReel);
router.get("/", reelController.getAllReels);
router.get("/:id", reelController.getReelById);
router.put("/:id", reelController.updateReel);
router.delete("/:id", reelController.deleteReel);

module.exports = router;