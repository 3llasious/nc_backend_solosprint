const {
  fetchAllArticles,
  fetchThisArticle,
} = require("../models/articles.model.js");

const NotFoundError = require("../errors/NotFoundErrorClass.js");

//require in the query function we will invoke

exports.getAllArticles = () => {
  return fetchAllArticles();
};

exports.getThisArticle = async (id) => {
  //this whole thing is the packaged result we got handed from the model layer
  const article = await fetchThisArticle(id);
  console.log(article);
  if (article.length === 0) {
    throw new NotFoundError("ID not found");
  } else {
    return article[0];
  }
};

//exported to be used by our controller layer controller
