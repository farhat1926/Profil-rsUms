const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // ambil semua dokter + jadwal
  router.get("/", (req, res) => {
    const sql = `
      SELECT 
        d.id,
        d.nama_dokter,
        d.spesialis,
        d.image,
        j.hari,
        j.jam
      FROM dokter d
      LEFT JOIN jadwal_dokter j
        ON d.id = j.dokter_id
      ORDER BY d.id
    `;

    db.query(sql, (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      // grouping data per dokter
      const groupedDoctors = {};

      result.forEach((row) => {
        if (!groupedDoctors[row.id]) {
          groupedDoctors[row.id] = {
            id: row.id,
            nama: row.nama_dokter,
            spesialis: row.spesialis,
            image: row.image,
            jadwal: {},
          };
        }

        if (row.hari && row.jam) {
          groupedDoctors[row.id].jadwal[row.hari] =
            row.jam;
        }
      });

      res.json(Object.values(groupedDoctors));
    });
  });

  // detail dokter
  router.get("/:id", (req, res) => {
    const sql = `
      SELECT 
        d.id,
        d.nama_dokter,
        d.spesialis,
        d.image,
        j.hari,
        j.jam
      FROM dokter d
      LEFT JOIN jadwal_dokter j
        ON d.id = j.dokter_id
      WHERE d.id = ?
    `;

    db.query(sql, [req.params.id], (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (result.length === 0) {
        return res
          .status(404)
          .json({ message: "Dokter tidak ditemukan" });
      }

      const doctor = {
        id: result[0].id,
        nama: result[0].nama_dokter,
        spesialis: result[0].spesialis,
        image: result[0].image,
        jadwal: {},
      };

      result.forEach((row) => {
        if (row.hari && row.jam) {
          doctor.jadwal[row.hari] = row.jam;
        }
      });

      res.json(doctor);
    });
  });

  return router;
};