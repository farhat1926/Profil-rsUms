const db = require("../config/db");

// 1. Fungsi untuk mencatat pengunjung baru
const trackVisitor = (req, res) => {
  const ipAddress = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const visitDate = new Date().toISOString().split("T")[0];

  const sql =
    "INSERT IGNORE INTO visitors (ip_address, visit_date) VALUES (?, ?)";

  db.query(sql, [ipAddress, visitDate], (err, result) => {
    if (err) {
      console.error("Gagal mencatat visitor:", err);
      return res.status(500).json({ message: "Server error" });
    }
    res.status(200).json({ message: "Visitor tracked successfully" });
  });
};

// 2. Fungsi untuk mengambil data grafik (Dinamis Mingguan/Bulanan)
const getVisitorStats = (req, res) => {
  const filter = req.query.filter || "7days"; // Default 7 hari terakhir
  let dateCondition = "";

  // Menentukan rentang tanggal berdasarkan filter
  if (filter === "7days") {
    dateCondition = "visit_date >= DATE(NOW()) - INTERVAL 6 DAY";
  } else if (filter === "this_week") {
    dateCondition = "YEARWEEK(visit_date, 1) = YEARWEEK(NOW(), 1)";
  } else if (filter === "last_week") {
    dateCondition =
      "YEARWEEK(visit_date, 1) = YEARWEEK(NOW() - INTERVAL 1 WEEK, 1)";
  } else if (filter === "this_month") {
    dateCondition =
      "MONTH(visit_date) = MONTH(NOW()) AND YEAR(visit_date) = YEAR(NOW())";
  } else if (filter === "last_month") {
    dateCondition =
      "MONTH(visit_date) = MONTH(NOW() - INTERVAL 1 MONTH) AND YEAR(visit_date) = YEAR(NOW() - INTERVAL 1 MONTH)";
  } else {
    dateCondition = "visit_date >= DATE(NOW()) - INTERVAL 6 DAY";
  }

  const sql = `
    SELECT 
      visit_date,
      DATE_FORMAT(visit_date, '%W') as day_name,
      DATE_FORMAT(visit_date, '%d') as day_num,
      DATE_FORMAT(visit_date, '%b') as month_name,
      COUNT(id) as pengunjung 
    FROM visitors 
    WHERE ${dateCondition}
    GROUP BY visit_date 
    ORDER BY visit_date ASC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Gagal mengambil statistik visitor:", err);
      return res.status(500).json({ message: "Server error" });
    }

    // Penerjemah ke Bahasa Indonesia
    const dayMap = {
      Monday: "Sen",
      Tuesday: "Sel",
      Wednesday: "Rab",
      Thursday: "Kam",
      Friday: "Jum",
      Saturday: "Sab",
      Sunday: "Min",
    };
    const monthMap = {
      Jan: "Jan",
      Feb: "Feb",
      Mar: "Mar",
      Apr: "Apr",
      May: "Mei",
      Jun: "Jun",
      Jul: "Jul",
      Aug: "Ags",
      Sep: "Sep",
      Oct: "Okt",
      Nov: "Nov",
      Dec: "Des",
    };

    const formattedData = results.map((row) => {
      let labelName = dayMap[row.day_name];
      if (filter === "this_month" || filter === "last_month") {
        labelName = `${row.day_num} ${monthMap[row.month_name]}`;
      }

      return {
        name: labelName,
        pengunjung: row.pengunjung,
      };
    });

    res.json(formattedData);
  });
};

module.exports = { trackVisitor, getVisitorStats };
