const devData = require("../data/development-data/index.js");
const seed = require("./queries.js");
const db = require("../connection.js");

const runQueries = () => {
  return seed(devData).then(() => db.end());
};

runQueries();
