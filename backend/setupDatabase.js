const mysql = require("mysql2");
const fs = require("fs");
const path = require("path");

// Konfigurasi koneksi ke MySQL (Tanpa memilih database dulu)
const connection = mysql.createConnection({
  host: "localhost",
  user: "root", // Sesuaikan jika Anda menggunakan username lain
  password: "", // Sesuaikan jika MySQL Anda memiliki password
  multipleStatements: true, // SANGAT PENTING: Mengizinkan eksekusi banyak query sekaligus
});

connection.connect((err) => {
  if (err) {
    console.error(
      "Koneksi ke MySQL gagal. Pastikan XAMPP/MySQL Anda menyala!",
      err,
    );
    process.exit(1);
  }

  console.log("✅ Berhasil terhubung ke MySQL Server.");

  // Membaca file setup.sql
  const sqlPath = path.join(__dirname, "setup.sql");
  let sqlQuery;

  try {
    sqlQuery = fs.readFileSync(sqlPath, "utf8");
    console.log("✅ Membaca file setup.sql...");
  } catch (readErr) {
    console.error("Gagal membaca file setup.sql:", readErr);
    process.exit(1);
  }

  // Menjalankan isi dari setup.sql
  connection.query(sqlQuery, (err, results) => {
    if (err) {
      console.error("❌ Gagal melakukan setup database:", err);
    } else {
      console.log(
        "🎉 SUCCESS! Database 'profile_rs' dan seluruh tabel berhasil dibuat!",
      );
      console.log(
        "➡️ Akun admin default -> Username: admin | Password: admin123",
      );
    }

    // Tutup koneksi setelah selesai
    connection.end();
    process.exit(0);
  });
});
