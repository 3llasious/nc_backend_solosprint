const { Pool } = require("pg");

const ENV = process.env.NODE_ENV || "development";

console.log("🔍 DEBUG - ENV:", ENV);
console.log("🔍 DEBUG - DATABASE_URL exists:", !!process.env.DATABASE_URL);

require("dotenv").config({ path: `${__dirname}/../.env.${ENV}` });

const config = {};
if (ENV === "production") {
  config.connectionString = process.env.DATABASE_URL;
  config.max = 2;
  config.ssl = { rejectUnauthorized: false }; // CRITICAL FOR SUPABASE!
  console.log("🔍 DEBUG - Production config set with DATABASE_URL");
  console.log(
    "🔍 DEBUG - Connection string starts with:",
    process.env.DATABASE_URL?.substring(0, 30),
  );
} // configiration check, passed into pool connection, max connections set to two

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error("No PGDATABASE configured");
} else {
  console.log(
    `Connected to ${process.env.PGDATABASE || "production database"}`,
  );
}

console.log("🔍 DEBUG - Final config:", JSON.stringify(config, null, 2));

const db = new Pool(config);

module.exports = db;
