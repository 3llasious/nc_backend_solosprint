const {
  getAllArticles: getAllArticlesServiceLayer,
} = require("../service/articles.service.js");

exports.getAllArticles = async (request, response) => {
  const result = await getAllArticlesServiceLayer();
  if (result !== undefined) {
    response.status(200).send({ articles: result });
  } else {
    response.status(404).send({ msg: "Sorry, that's not a valid request" });
  }
  //nothing needed frm the request obj here
};

//this is getAllArticles is being exported
