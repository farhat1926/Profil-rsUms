const mysql = require("mysql2");
const fs = require("fs");
const path = require("path");

// WAJIB: Memanggil dotenv agar bisa membaca file .env di folder yang sama
require("dotenv").config({ path: path.join(__dirname, ".env") });

// Konfigurasi koneksi ke MySQL menggunakan variabel dari .env
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD, // Otomatis mengambil password dari .env
  multipleStatements: true, // SANGAT PENTING: Mengizinkan eksekusi banyak query
});

connection.connect((err) => {
  if (err) {
    console.error(
      "❌ Koneksi ke MySQL gagal. Pastikan password di .env sudah benar!",
      err.message,
    );
    process.exit(1);
  }

  console.log("✅ Berhasil terhubung ke MySQL Server.");

  // Membaca file setup.sql
  const sqlPath = path.join(__dirname, "database", "setup.sql");
  let sqlQuery;

  try {
    sqlQuery = fs.readFileSync(sqlPath, "utf8");
    console.log("✅ Membaca file setup.sql...");
  } catch (readErr) {
    console.error(
      "❌ Gagal membaca file setup.sql. Pastikan file tersebut ada di folder backend!",
      readErr.message,
    );
    process.exit(1);
  }

  // Menjalankan isi dari setup.sql
  connection.query(sqlQuery, (err, results) => {
    if (err) {
      console.error("❌ Gagal melakukan setup database:", err.message);
    } else {
      console.log(
        "🎉 SUCCESS! Database dan seluruh tabel berhasil dibuat berdasarkan setup.sql!",
      );
      // Catatan: Pastikan di dalam file setup.sql Anda sudah menggunakan hash password untuk admin
    }

    // Tutup koneksi setelah selesai
    connection.end();
    process.exit(0);
  });
});
