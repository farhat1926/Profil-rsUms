const db = require("../config/db");

const createEvent = (req, res) => {
  const { title, short_desc, full_desc, event_date } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  const sql = `INSERT INTO event_kegiatan (title, short_desc, full_desc, image, event_date) VALUES (?, ?, ?, ?, ?)`;

  db.query(
    sql,
    [title, short_desc, full_desc, image, event_date],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
      res.json({ message: "Event berhasil ditambahkan", id: result.insertId });
    },
  );
};

const getAllEvents = (req, res) => {
  db.query(
    `SELECT * FROM event_kegiatan ORDER BY event_date DESC`,
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json(result);
    },
  );
};

const getEventById = (req, res) => {
  const id = req.params.id;
  db.query(`SELECT * FROM event_kegiatan WHERE id = ?`, [id], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.length === 0)
      return res.status(404).json({ message: "Event tidak ditemukan" });
    res.json(result[0]);
  });
};

const deleteEvent = (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM event_kegiatan WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).send(err);
    res.send("Event berhasil dihapus");
  });
};

const updateEvent = (req, res) => {
  const id = req.params.id;
  const { title, short_desc, full_desc, event_date } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;

  const sql = `UPDATE event_kegiatan SET title=?, short_desc=?, full_desc=?, image=?, event_date=? WHERE id=?`;

  db.query(
    sql,
    [title, short_desc, full_desc, image, event_date, id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send("Event berhasil diupdate");
    },
  );
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  deleteEvent,
  updateEvent,
};
