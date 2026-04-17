const express = require("express");

module.exports = (db, upload) => {
  const router = express.Router();

  // ============================
  // INSERT INFORMASI
  // ============================
  router.post("/", upload.single("image"), (req, res) => {
    const {
      title,
      category,
      summary,
      content,
      author,
      date,
    } = req.body;

    const image = req.file
      ? `/uploads/${req.file.filename}`
      : null;

    const sql = `
      INSERT INTO informasi
      (title, category, summary, content, author, date, image)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [
        title,
        category,
        summary,
        content,
        author,
        date,
        image,
      ],
      (err, result) => {
        if (err) return res.status(500).send(err);

        res.json({
          message: "Informasi berhasil ditambahkan",
          id: result.insertId,
        });
      }
    );
  });

  // ============================
  // GET SEMUA INFORMASI
  // ============================
  router.get("/", (req, res) => {
    const sql = `
      SELECT *
      FROM informasi
      ORDER BY date DESC
    `;

    db.query(sql, (err, result) => {
      if (err) return res.status(500).send(err);

      res.json(result);
    });
  });

  // ============================
  // GET DETAIL INFORMASI
  // ============================
  router.get("/:id", (req, res) => {
    const sql = `
      SELECT *
      FROM informasi
      WHERE id = ?
    `;

    db.query(sql, [req.params.id], (err, result) => {
      if (err) return res.status(500).send(err);

      if (result.length === 0) {
        return res
          .status(404)
          .json({ message: "Data tidak ditemukan" });
      }

      res.json(result[0]);
    });
  });

  // ============================
  // DELETE INFORMASI
  // ============================
  router.delete("/:id", (req, res) => {
    db.query(
      "DELETE FROM informasi WHERE id = ?",
      [req.params.id],
      (err) => {
        if (err) return res.status(500).send(err);

        res.send("Data berhasil dihapus");
      }
    );
  });

  return router;
};