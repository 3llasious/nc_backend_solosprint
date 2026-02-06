const {
  getAllArticles: getAllArticlesServiceLayer,
  getThisArticle: getThisArticleServiceLayer,
} = require("../service/articles.service.js");

exports.getAllArticles = async (request, response) => {
  const result = await getAllArticlesServiceLayer();

  response.status(200).send({ articles: result });

  //nothing needed frm the request obj here
};

exports.getThisArticle = async (request, response, next) => {
  const { id } = request.params;
  //console.logged to see available params

  try {
    const resultarticle = await getThisArticleServiceLayer(id);
    //this whole thing is the packaged result we got handed from the service layer
    response.status(200).send({ article: resultarticle });
    //this invokes the model with the correct id
    //sends off the response from the getThisArticle function to the app layer with status 200 stored on a key of article
  } catch (err) {
    // this block runs if the id doesn't exist it catches the error from the service layer

    next(err);
    //this exists our current middleware chain and takes us to the error middleware chain in app.js
  }
};

//this is getAllArticles is being exported
