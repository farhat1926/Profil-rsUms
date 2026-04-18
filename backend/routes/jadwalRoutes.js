const express = require("express");
const router = express.Router();
const upload = require("../config/multer"); // Panggil multer
const {
  createJadwal,
  getAllJadwal,
  deleteJadwal,
  updateJadwal,
} = require("../controllers/jadwalController");

// Karena di server.js rutenya adalah "/jadwal", di sini kita cukup pakai "/"
router.post("/", upload.single("image"), createJadwal);
router.get("/", getAllJadwal);
router.delete("/:id", deleteJadwal);
router.put("/:id", upload.single("image"), updateJadwal);

module.exports = router;
