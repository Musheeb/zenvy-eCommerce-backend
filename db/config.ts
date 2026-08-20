import mongoose from "mongoose";

const databaseConnection = async () => {
  try {
    if (!process.env.DATABASE_URL) throw new Error("Database url not found");
    const conn = await mongoose.connect(process.env.DATABASE_URL, {
      readPreference: "primary",
    });
    console.log(
      `📚 Database connected! zenvy-${process.env.STAGE || "DEVELOPMENT"}`,
    );
  } catch (e) {
    if (e instanceof Error) {
      console.log(`Error connecting to database: ${e.message}`);
    } else {
      console.log(`Error connecting to database: ${String(e)}`);
    }
    process.exit(1);
  }
};

export default databaseConnection;
