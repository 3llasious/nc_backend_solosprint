const db = require("../db/connection");
//import the db connection because this file deals with SQL queries

exports.fetchAllUsers = async () => {
  const { rows } = await db.query(
    "SELECT username, name, avatar_url FROM users",
  );

  return rows;
};
exports.fetchThisUser = async (username) => {
  const { rows } = await db.query(
    "SELECT username, name, avatar_url FROM users WHERE username = $1",
    [username],
  );
  return rows[0];
};

exports.insertThisUser = async (body) => {
  const { rows } = await db.query(
    `INSERT INTO users
    (username, name, avatar_url) VALUES 
    ($1,$2,$3) RETURNING *`,
    [body.username, body.name, body.avatar_url],
  );
  return rows[0];
};
