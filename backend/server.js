const path = require("path");
const fs = require("fs");
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

app.get(["/artikel", "/artikel/"], (req, res) => {
  const indexPath = path.join(__dirname, "../frontend/dist/index.html");
  res.sendFile(indexPath);
});

app.get("/artikel/:slug", (req, res, next) => {
  const slug = req.params.slug;

  const sql = "SELECT * FROM informasi";

  db.query(sql, (err, results) => {
    const indexPath = path.join(__dirname, "../frontend/dist/index.html");

    if (err || results.length === 0) {
      return res.sendFile(indexPath);
    }

    const buatSlug = (teks) => {
      if (!teks) return "";
      return teks
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
    };

    const article = results.find((item) => buatSlug(item.title) === slug);

    if (!article) {
      return res.sendFile(indexPath);
    }
    const BASE_URL = `https://rs.ums.ac.id`;
    const imageUrl = `${BASE_URL}${article.image}`;
    const fullUrl = `${BASE_URL}/artikel/${slug}`;

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
            <!-- Standar SEO & Open Graph -->
            <meta name="description" content="${article.summary}" />
            <meta property="og:title" content="${article.title} - RS UMS" />
            <meta property="og:description" content="${article.summary}" />
            <meta property="og:image" content="${imageUrl}" />
            <meta property="og:url" content="${fullUrl}" />
            <meta property="og:type" content="article" />
            
            <!-- Standar Twitter Cards -->
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

app.listen(port, () => {
  console.log(`Server jalan di http://localhost:${port}`);
});
