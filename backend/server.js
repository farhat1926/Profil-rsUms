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

//import routes
const adminRoutes = require("./routes/adminRoutes");
const jadwalRoutes = require("./routes/jadwalRoutes");
const eventRoutes = require("./routes/eventRoutes");
const promoRoutes = require("./routes/promoRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const informasiRoutes = require("./routes/informasiRoutes");

app.use("/admin", adminRoutes);
app.use("/jadwal", jadwalRoutes);
app.use("/event", eventRoutes);
app.use("/promo", promoRoutes);
app.use("/doctor", doctorRoutes(db));
app.use("/informasi", informasiRoutes);

app.listen(port, () => {
  console.log(`Server jalan di http://localhost:${port}`);
});
