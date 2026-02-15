const { Pool } = require("pg");

const db = new Pool({
  connectionString:
    "postgresql://postgres:Oizaitop01!!@db.htvhqjnxjyjexrmijhwh.supabase.co:5432/postgres",
  ssl: { rejectUnauthorized: false },
  max: 2,
});

module.exports = db;
