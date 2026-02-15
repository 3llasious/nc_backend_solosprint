const { Pool } = require("pg");

const ENV = process.env.NODE_ENV || "development";

if (ENV !== "production") {
  require("dotenv").config({ path: `${__dirname}/../.env.${ENV}` });
}

const config = {};
if (ENV === "production") {
  config.connectionString = process.env.DATABASE_URL;
  config.max = 2;
  config.ssl = { rejectUnauthorized: false }; // CRITICAL FOR SUPABASE!
  // Force these to be undefined so they don't override
  delete process.env.PGHOST;
  delete process.env.PGUSER;
  delete process.env.PGPASSWORD;
  delete process.env.PGDATABASE;
  delete process.env.PGPORT;
} // configiration check, passed into pool connection, max connections set to two

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error("No PGDATABASE configured");
} else {
  console.log(
    `Connected to ${process.env.PGDATABASE || "production database"}`,
  );
}

const db = new Pool(config);

module.exports = db;
