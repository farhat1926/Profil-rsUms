const express = require("express");
const router = express.Router();
const promoController = require("../controllers/promoController");

const upload = require("../config/multer"); // Panggil multer
const path = require("path");

// ROUTES
router.get("/", promoController.getAllPromo);
router.get("/:id", promoController.getPromoById);
router.post("/", upload.single("image"), promoController.createPromo);
router.delete("/:id", promoController.deletePromo);
router.put("/:id", upload.single("image"), promoController.updatePromo);

module.exports = router;
