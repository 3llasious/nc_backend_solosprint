const db = require("../db/connection");
//import the db connection because this file deals with SQL queries

exports.fetchAllUsers = async () => {
  const { rows } = await db.query(
    "SELECT username, name, avatar_url FROM users",
  );

  console.log(rows);

  return rows;
};
