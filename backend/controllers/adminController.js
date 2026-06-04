const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginAdmin = (req, res) => {
  const { username, password } = req.body;

  // 1. Cari admin berdasarkan username
  const sql = "SELECT * FROM admins WHERE username = ?";

  db.query(sql, [username], async (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }

    if (result.length === 0) {
      return res.status(401).json({ message: "Username tidak ditemukan!" });
    }

    const admin = result[0];

    try {
      const isMatch = await bcrypt.compare(password, admin.password);

      if (!isMatch) {
        return res.status(401).json({ message: "Password salah!" });
      }

      const token = jwt.sign(
        { id: admin.id, username: admin.username },
        process.env.JWT_SECRET, 
        { expiresIn: "1d" }, 
      );

      res.json({
        message: "Login Berhasil",
        token: token,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Terjadi kesalahan saat verifikasi" });
    }
  });
};

module.exports = {
  loginAdmin,
};
