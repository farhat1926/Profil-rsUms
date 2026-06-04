// Panggil koneksi database dari folder config
const db = require("../config/db");

const createInformasi = (req, res) => {
  const { title, category, summary, content, author, date } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  const sql = `
    INSERT INTO informasi
    (title, category, summary, content, author, date, image)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [title, category, summary, content, author, date, image],
    (err, result) => {
      if (err) return res.status(500).send(err);

      res.json({
        message: "Informasi berhasil ditambahkan",
        id: result.insertId,
      });
    },
  );
};

const getAllInformasi = (req, res) => {
  const sql = `
    SELECT *
    FROM informasi
    ORDER BY date DESC
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
};

const getInformasiById = (req, res) => {
  const sql = `
    SELECT *
    FROM informasi
    WHERE id = ?
  `;

  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).send(err);

    if (result.length === 0) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    res.json(result[0]);
  });
};

const deleteInformasi = (req, res) => {
  db.query("DELETE FROM informasi WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.send("Data berhasil dihapus");
  });
};

const updateInformasi = (req, res) => {
  const id = req.params.id;
  const { title, category, summary, content, author, date } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;

  const sql = `UPDATE informasi SET title=?, category=?, summary=?, content=?, author=?, date=?, image=? WHERE id=?`;
  db.query(
    sql,
    [title, category, summary, content, author, date, image, id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send("Informasi berhasil diupdate");
    },
  );
};

// Export semua fungsi agar bisa dipanggil di routes
module.exports = {
  createInformasi,
  getAllInformasi,
  getInformasiById,
  deleteInformasi,
  updateInformasi,
};
