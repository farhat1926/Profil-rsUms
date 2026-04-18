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

const db = require("./config/db");

// ============================
// INSERT JADWAL
// ============================
app.post("/jadwal", upload.single("image"), (req, res) => {
  const { namaDokter, spesialis } = req.body;
  const image = req.file
    ? `/uploads/${req.file.filename}`
    : null;

  const sqlDokter =
    "INSERT INTO dokter (nama_dokter, spesialis, image) VALUES (?, ?, ?)";

  db.query(
    sqlDokter,
    [namaDokter, spesialis, image],
    (err, result) => {
      if (err) return res.status(500).send(err);

      const dokterId = result.insertId;

      const jadwalParsed = JSON.parse(req.body.jadwal);

      let jadwalData = [];

      jadwalParsed.forEach((item) => {
        if (item.hari && item.mulai && item.selesai) {
          jadwalData.push([
            dokterId,
            item.hari,
            `${item.mulai} - ${item.selesai}`,
          ]);
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
    }
  );
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
// INSERT EVENT
// ============================
// ============================
// INSERT EVENT (gambar internal)
// ============================
// ============================
// INSERT EVENT
// ============================
// ============================
// CREATE EVENT
// ============================
app.post("/event", upload.single("image"), (req, res) => {
  const { title, short_desc, full_desc, event_date } = req.body;

  const image = req.file
    ? `/uploads/${req.file.filename}`
    : null;

  const sql = `
    INSERT INTO event_kegiatan
    (title, short_desc, full_desc, image, event_date)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [title, short_desc, full_desc, image, event_date],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }

      res.json({
        message: "Event berhasil ditambahkan",
        id: result.insertId,
      });
    }
  );
});
// ============================
// GET SEMUA EVENT
// ============================
app.get("/event", (req, res) => {
  db.query(
    `SELECT * FROM event_kegiatan ORDER BY event_date DESC`,
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json(result);
    }
  );
});

// ============================
// GET DETAIL EVENT (FIX)
// ============================
app.get("/event/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    `SELECT * FROM event_kegiatan WHERE id = ?`,
    [id],
    (err, result) => {
      if (err) return res.status(500).send(err);

      if (result.length === 0) {
        return res.status(404).json({
          message: "Event tidak ditemukan",
        });
      }

      res.json(result[0]);
    }
  );
});

// ============================
// DELETE EVENT
// ============================
app.delete("/event/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    "DELETE FROM event_kegiatan WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send("Event berhasil dihapus");
    }
  );
});

// ============================
// UPDATE EVENT (pakai upload juga biar sinkron)
// ============================
app.put("/event/:id", upload.single("image"), (req, res) => {
  const id = req.params.id;

  const { title, short_desc, full_desc, event_date } = req.body;

  const image = req.file
    ? `/uploads/${req.file.filename}`
    : req.body.image; // fallback kalau tidak upload baru

  const sql = `
    UPDATE event_kegiatan
    SET title=?, short_desc=?, full_desc=?, image=?, event_date=?
    WHERE id=?
  `;

  db.query(
    sql,
    [title, short_desc, full_desc, image, event_date, id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send("Event berhasil diupdate");
    }
  );
});
// ============================
// JALANKAN SERVER
// ============================
const informasiRoutes = require("./routes/informasiRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
app.use("/doctor", doctorRoutes(db));

app.use(
  "/informasi",
  informasiRoutes(db, upload)
);
const promoRoutes = require("./routes/promoRoutes");
app.use("/promo", promoRoutes);

app.listen(3001, () => {
  console.log("Server jalan di http://localhost:3001");
});