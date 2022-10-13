import dotenv from "dotenv";
dotenv.config();

const dbConfig = {
  HOST: process.env.DATABASE_HOST,
  USER: process.env.DATABASE_USER,
  PASSWORD: process.env.DATABASE_PASSWORD,
  DB: process.env.DATABASE_DB,
};

export default dbConfig;
