const db = require("../db/connection");
//import the db connection because this file deals with SQL queries

exports.fetchAllTopics = async () => {
  //this is being destructured so you're exporting a single function must destructure to import too
  const { rows } = await db.query("SELECT * FROM topics");

  //destructure rows from the response of this query/request from client
  //and return it

  return rows;
};
