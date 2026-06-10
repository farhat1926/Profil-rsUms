const bcrypt = require("bcrypt");

const makeHash = async () => {
  // Ganti "admin123" dengan password asli yang Anda inginkan
  const passwordAsli = "admin123";
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(passwordAsli, salt);

  console.log(
    "Salin teks di bawah ini dan masukkan ke kolom password di database phpMyAdmin Anda:",
  );
  console.log(hashedPassword);
};

makeHash();
