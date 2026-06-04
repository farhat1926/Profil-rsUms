const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const {
  createEvent,
  getAllEvents,
  getEventById,
  deleteEvent,
  updateEvent,
} = require("../controllers/eventController");

router.post("/", upload.single("image"), createEvent);
router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.delete("/:id", deleteEvent);
router.put("/:id", upload.single("image"), updateEvent);

module.exports = router;
