const express = require("express");
const router = express.Router();

// Panggil konfigurasi multer untuk upload gambar
const upload = require("../config/multer");

// Panggil fungsi-fungsi dari controller
const {
  createInformasi,
  getAllInformasi,
  getInformasiById,
  deleteInformasi,
  updateInformasi,
} = require("../controllers/informasiController");

// Definisikan rute (Endpoint)
router.post("/", upload.single("image"), createInformasi);
router.get("/", getAllInformasi);
router.get("/:id", getInformasiById);
router.put("/:id", upload.single("image"), updateInformasi);
router.delete("/:id", deleteInformasi);

module.exports = router;
