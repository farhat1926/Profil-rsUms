const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
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

// middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// koneksi MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "fardanio19",
  database: "profile_rs",
});

// cek koneksi
db.connect((err) => {
  if (err) {
    console.error("Koneksi gagal:", err);
  } else {
    console.log("MySQL Connected...");
  }
});


// ============================
// INSERT JADWAL
// ============================
app.post("/jadwal", upload.single("image"), (req, res) => {
  const { namaDokter,spesialis, jadwal, } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  // simpan dokter
  const sqlDokter = "INSERT INTO dokter (nama_dokter, spesialis, image) VALUES (?, ?, ?)";

  db.query(sqlDokter, [namaDokter, spesialis, image], (err, result) => {
    if (err) return res.status(500).send(err);

    const dokterId = result.insertId;

    let jadwalData = [];

    Object.keys(jadwal).forEach((hari) => {
      if (jadwal[hari]) {
        const jamList = jadwal[hari].split("\n");

        jamList.forEach((jam) => {
          if (jam.trim() !== "") {
            jadwalData.push([dokterId, hari, jam]);
          }
        });
      }
    });

    if (jadwalData.length === 0) {
      return res.send("Dokter disimpan tanpa jadwal");
    }

    const sqlJadwal =
      "INSERT INTO jadwal_dokter (dokter_id, hari, jam) VALUES ?";

    db.query(sqlJadwal, [jadwalData], (err2) => {
      if (err2) return res.status(500).send(err2);

      res.send("Data berhasil disimpan!");
    });
  });
});


// ============================
// GET SEMUA JADWAL
// ============================
app.get("/jadwal", (req, res) => {
 const sql = `
  SELECT 
    d.id, 
    d.nama_dokter, 
    d.spesialis,
    d.image,
    j.hari, 
    j.jam
  FROM dokter d
  LEFT JOIN jadwal_dokter j ON d.id = j.dokter_id
  ORDER BY d.id, j.hari
`;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).send(err);

    res.json(result);
  });
});



// ============================
// DELETE DOKTER (sekalian jadwal)
// ============================
app.delete("/jadwal/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM dokter WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).send(err);

    res.send("Data berhasil dihapus");
  });
});
// ============================
// UPDATE DOKTER + JADWAL
// ============================
app.put("/jadwal/:id", upload.single("image"), (req, res) => {
  const id = req.params.id;
  const { nama_dokter, spesialis, hari, jam } = req.body;

  const image = req.file
    ? `/uploads/${req.file.filename}`
    : null;

  const sqlDokter = `
    UPDATE dokter
    SET nama_dokter = ?, spesialis = ?,
        image = COALESCE(?, image)
    WHERE id = ?
  `;

  db.query(
    sqlDokter,
    [nama_dokter, spesialis, image, id],
    (err) => {
      if (err) return res.status(500).send(err);

      const sqlJadwal = `
        UPDATE jadwal_dokter
        SET jam = ?
        WHERE dokter_id = ? AND hari = ?
      `;

      db.query(
        sqlJadwal,
        [jam, id, hari],
        (err2) => {
          if (err2) return res.status(500).send(err2);

          res.send("Data berhasil diupdate");
        }
      );
    }
  );
});

// ============================
// JALANKAN SERVER
// ============================
app.listen(3001, () => {
  console.log("Server jalan di http://localhost:3001");
});