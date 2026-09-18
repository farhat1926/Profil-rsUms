const path = require("path");
const fs = require("fs"); // Wajib untuk membaca file index.html frontend
const dotenv = require("dotenv");
dotenv.config({ path: path.resolve(__dirname, ".env") });
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;
const db = require("./config/db");
const upload = require("./config/multer");

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Import routes
const adminRoutes = require("./routes/adminRoutes");
const jadwalRoutes = require("./routes/jadwalRoutes");
const promoRoutes = require("./routes/promoRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const informasiRoutes = require("./routes/informasiRoutes");
const reelRoutes = require("./routes/reelsRoutes");
const visitorRoutes = require("./routes/visitorRoutes");

app.use("/admin", adminRoutes);
app.use("/jadwal", jadwalRoutes);
app.use("/promo", promoRoutes);
app.use("/reels", reelRoutes);
app.use("/doctor", doctorRoutes(db));
app.use("/informasi", informasiRoutes);
app.use("/visitors", visitorRoutes);

// =========================================================================
// ROUTE KHUSUS INJEKSI META TAG UNTUK SEMUA SOSIAL MEDIA
// =========================================================================
app.get("/artikel/:slug", (req, res, next) => {
  const slug = req.params.slug;

  // 1. Tarik semua artikel dari database
  const sql = "SELECT * FROM informasi";

  db.query(sql, (err, results) => {
    // Sesuaikan path ke file index.html React/Vite Anda
    const indexPath = path.join(__dirname, "../frontend/dist/index.html");

    if (err || results.length === 0) {
      return res.sendFile(indexPath);
    }

    // 2. Fungsi untuk mengubah judul database menjadi format URL (slug)
    const buatSlug = (teks) => {
      if (!teks) return "";
      return teks
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
    };

    // 3. Cari artikel yang hasil konversi judulnya persis sama dengan parameter URL
    const article = results.find((item) => buatSlug(item.title) === slug);

    if (!article) {
      // Jika judul tidak ditemukan, kembalikan halaman web standar
      return res.sendFile(indexPath);
    }

    // 4. Siapkan URL gambar dan URL artikel
    // PENTING: UBAH BASE_URL MENJADI "https://rs.ums.ac.id" SAAT DEPLOY KE VPS / ONLINE
    const BASE_URL = `https://rs.ums.ac.id`;
    const imageUrl = `${BASE_URL}${article.image}`;
    const fullUrl = `${BASE_URL}/artikel/${slug}`;

    // 5. Baca kerangka website (index.html) lalu suntikkan meta tag
    fs.readFile(indexPath, "utf8", (err, htmlData) => {
      if (err) {
        console.error("Gagal membaca index.html:", err);
        return res.status(500).send("Error rendering page");
      }

      const injectedHtml = htmlData
        .replace(
          /<title>(.*?)<\/title>/i,
          `<title>${article.title} - RS UMS A.R. Fachrudin</title>`,
        )
        .replace(
          "</head>",
          `
            <!-- Standar SEO & Open Graph (WhatsApp, FB, LinkedIn, Telegram) -->
            <meta name="description" content="${article.summary}" />
            <meta property="og:title" content="${article.title} - RS UMS" />
            <meta property="og:description" content="${article.summary}" />
            <meta property="og:image" content="${imageUrl}" />
            <meta property="og:url" content="${fullUrl}" />
            <meta property="og:type" content="article" />
            
            <!-- Standar Twitter Cards (X / Twitter) -->
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:image" content="${imageUrl}" />
            <meta name="twitter:title" content="${article.title}" />
            <meta name="twitter:description" content="${article.summary}" />
          </head>
        `,
        );

      res.send(injectedHtml);
    });
  });
});
// =========================================================================

app.listen(port, () => {
  console.log(`Server jalan di http://localhost:${port}`);
});
