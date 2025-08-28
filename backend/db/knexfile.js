// backend/knexfile.js
import dotenv from "dotenv";
dotenv.config();

const knexConfig = {
  development: {
    client: "mysql2",
    connection: {
      host: process.env.DB_HOST || "127.0.0.1",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASS || "root@123",
      database: process.env.DB_NAME || "clothing_store",
    },
    migrations: {
      directory: "./migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  },
};

export default knexConfig;
