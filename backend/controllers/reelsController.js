// Panggil koneksi database dari folder config
const db = require("../config/db");

const createReel = (req, res) => {
  const { link } = req.body;

  const sql = `
    INSERT INTO reels (link)
    VALUES (?)
  `;

  db.query(sql, [link], (err, result) => {
    if (err) return res.status(500).send(err);

    res.json({
      message: "Link Reels berhasil ditambahkan",
      id: result.insertId,
    });
  });
};

const getAllReels = (req, res) => {
  const sql = `
    SELECT *
    FROM reels
    ORDER BY id DESC
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
};

const getReelById = (req, res) => {
  const sql = `
    SELECT *
    FROM reels
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

const deleteReel = (req, res) => {
  db.query("DELETE FROM reels WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "Link Reels berhasil dihapus" });
  });
};

const updateReel = (req, res) => {
  const id = req.params.id;
  const { link } = req.body;

  const sql = `UPDATE reels SET link=? WHERE id=?`;
  db.query(sql, [link, id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "Link Reels berhasil diupdate" });
  });
};

// Export semua fungsi agar bisa dipanggil di routes
module.exports = {
  createReel,
  getAllReels,
  getReelById,
  deleteReel,
  updateReel,
};
