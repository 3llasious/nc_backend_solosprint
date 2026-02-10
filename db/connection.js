const { Pool } = require("pg");

const ENV = process.env.NODE_ENV || "development";

require("dotenv").config({ path: `${__dirname}/../.env.${ENV}` });

if (!process.env.PGDATABASE) {
  throw new Error("No PGDATABASE configured");
} else {
  console.log(`Connected to ${process.env.PGDATABASE}`);
}

const config = {};

const db = new Pool(config);

if (ENV === "production") {
  config.connectionString = process.env.DATABASE_URL;
  config.max = 2;
} // configiration check, passed into pool connection, max connections set to two

module.exports = db;
