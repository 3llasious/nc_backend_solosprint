const { fetchAllArticles } = require("../models/articles.model.js");

//require in the query function we will invoke

exports.getAllArticles = () => {
  return fetchAllArticles();
};

//exported to be used by our controller layer controller
