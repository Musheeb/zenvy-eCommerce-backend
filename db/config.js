const mongoose = require("mongoose");

module.exports = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URL, {
      readPreference: "primary",
    });
    console.log(
      `📚 Database connected! zenvy-${process.env.STAGE || "DEVELOPMENT"}`,
    );
  } catch (e) {
    console.log(`Error connecting to database: ${e.message}`);
    process.exit(1);
  }
};
