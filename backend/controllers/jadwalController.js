const db = require("../config/db");

const createJadwal = (req, res) => {
  // Tambahkan deskripsi dari req.body
  const { namaDokter, spesialis, deskripsi } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  // Tambahkan kolom deskripsi di query INSERT
  const sqlDokter =
    "INSERT INTO dokter (nama_dokter, spesialis, deskripsi, image) VALUES (?, ?, ?, ?)";

  // Masukkan variabel deskripsi ke dalam array parameter
  db.query(
    sqlDokter,
    [namaDokter, spesialis, deskripsi, image],
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
    },
  );
};

const getAllJadwal = (req, res) => {
  // Tambahkan d.deskripsi pada bagian SELECT
  const sql = `
    SELECT d.id, d.nama_dokter, d.spesialis, d.deskripsi, d.image, j.hari, j.jam
    FROM dokter d
    LEFT JOIN jadwal_dokter j ON d.id = j.dokter_id
    ORDER BY d.id, j.hari
  `;
  db.query(sql, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
};

const deleteJadwal = (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM dokter WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).send(err);
    res.send("Data berhasil dihapus");
  });
};

const updateJadwal = (req, res) => {
  const id = req.params.id;
  const { namaDokter, spesialis, deskripsi } = req.body; // Sesuaikan penamaan dengan frontend
  const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;

  const sqlDokter = `UPDATE dokter SET nama_dokter = ?, spesialis = ?, deskripsi = ?, image = COALESCE(?, image) WHERE id = ?`;

  db.query(sqlDokter, [namaDokter, spesialis, deskripsi, image, id], (err) => {
    if (err) return res.status(500).send(err);

    // Hapus semua jadwal lama milik dokter ini
    db.query("DELETE FROM jadwal_dokter WHERE dokter_id = ?", [id], (err2) => {
      if (err2) return res.status(500).send(err2);

      const jadwalParsed = JSON.parse(req.body.jadwal);
      let jadwalData = [];

      jadwalParsed.forEach((item) => {
        if (item.hari && item.mulai && item.selesai) {
          jadwalData.push([id, item.hari, `${item.mulai} - ${item.selesai}`]);
        }
      });

      if (jadwalData.length === 0)
        return res.send("Dokter diupdate tanpa jadwal");

      // Masukkan jadwal yang baru
      const sqlJadwal =
        "INSERT INTO jadwal_dokter (dokter_id, hari, jam) VALUES ?";
      db.query(sqlJadwal, [jadwalData], (err3) => {
        if (err3) return res.status(500).send(err3);
        res.send("Data berhasil diupdate beserta jadwal baru!");
      });
    });
  });
};

module.exports = { createJadwal, getAllJadwal, deleteJadwal, updateJadwal };
