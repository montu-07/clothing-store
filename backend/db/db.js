// backend/config/db.js
import knex from "knex";
import knexConfig from "./knexfile.js"; 

const environment = process.env.NODE_ENV || "development";
const db = knex(knexConfig[environment]);

// 🔹 Test DB connection at startup
(async () => {
  try {
    await db.raw("SELECT 1+1 AS result");
    console.log("✅ MySQL connected via Knex");
  } catch (err) {
    console.error("❌ MySQL connection failed:", err);
  }
})();

export default db;
