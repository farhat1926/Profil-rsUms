const db = require("../db");

// GET semua promo
exports.getAllPromo = (req, res) => {
  const sql = "SELECT * FROM promosi ORDER BY id DESC";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
};

// GET detail promo by ID
exports.getPromoById = (req, res) => {
  const id = req.params.id;

  const sql = "SELECT * FROM promosi WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "Promo tidak ditemukan",
      });
    }

    res.json(result[0]);
  });
};

// POST tambah promo
exports.createPromo = (req, res) => {
  console.log("BODY:", req.body);
  console.log("FILE:", req.file);

  const {
    title,
    description,
    detail_description,
    link,
  } = req.body;

  const image = req.file
    ? `/uploads/${req.file.filename}`
    : null;

  const sql = `
    INSERT INTO promosi
    (title, description, detail_description, link, image)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      title,
      description,
      detail_description,
      link,
      image,
    ],
    (err, result) => {
      if (err) {
        console.error("ERROR INSERT:", err);
        return res.status(500).json(err);
      }

      res.json({
        message: "Promosi berhasil ditambahkan",
      });
    }
  );
};

// DELETE promo
exports.deletePromo = (req, res) => {
  const id = req.params.id;

  db.query(
    "DELETE FROM promosi WHERE id = ?",
    [id],
    (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Promo berhasil dihapus",
      });
    }
  );
};
