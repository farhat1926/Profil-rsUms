const express = require("express");
const router = express.Router();
const promoController = require("../controllers/promoController");

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// ROUTES
router.get("/", promoController.getAllPromo);
router.get("/:id", promoController.getPromoById);
router.post("/", upload.single("image"), promoController.createPromo);
router.delete("/:id", promoController.deletePromo);

module.exports = router;