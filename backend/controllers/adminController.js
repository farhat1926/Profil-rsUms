// Memanggil koneksi database (sesuaikan letak file db.js Anda, biasanya naik 1 folder dengan '../')
const db = require("../config/db");

// Logika untuk Login Admin
const loginAdmin = (req, res) => {
  const { username, password } = req.body;

  const query = "SELECT * FROM admins WHERE username = ? AND password = ?";
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Terjadi kesalahan server" });
    }

    if (results.length > 0) {
      res.json({
        success: true,
        message: "Login berhasil",
        token: "admin_token_auth_rs_ums_" + results[0].id,
      });
    } else {
      res
        .status(401)
        .json({ success: false, message: "Username atau password salah!" });
    }
  });
};

// Export fungsi agar bisa digunakan di file routes
module.exports = {
  loginAdmin,
};
