const { request, response } = require("../app.js");
const {
  getAllArticles: getAllArticlesServiceLayer,
  getThisArticle: getThisArticleServiceLayer,
  getCommentsForThisArticle: getCommentsForThisArticleSL,
  postCommentOnThisArticle: postCommentOnThisArticleSL,
  VoteOnThisArticle: VoteOnThisArticleSL,
} = require("../service/articles.service.js");

exports.getAllArticles = async (request, response, next) => {
  // console.log(Object.keys(request));
  // console.log(request.url);   is  /?order=desc
  // console.log(request.query);

  const { url } = request;
  const { query } = request;
  try {
    if (query) {
      const result = await getAllArticlesServiceLayer(query);
      response.status(200).send({ articles: result });
    } else {
      const result = await getAllArticlesServiceLayer();
      response.status(200).send({ articles: result });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }

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

exports.getCommentsForThisArticle = async (request, response, next) => {
  const { id } = request.params;
  try {
    const result = await getCommentsForThisArticleSL(id);
    if (result.length === 0) {
      response
        .status(200)
        .send({ msg: "oops, nothing to see here yet! add a comment!" });
    } else {
      response.status(200).send({ comments: result });
    }
  } catch (err) {
    next(err);
    //for invalid article id input
  }
};

exports.postCommentOnThisArticle = async (request, response, next) => {
  const { id } = request.params;
  const { body } = request;

  try {
    const result = await postCommentOnThisArticleSL(id, body);

    response.status(201).send({ comment: result });
  } catch (err) {
    next(err);
  }
};

exports.VoteOnThisArticle = async (request, response, next) => {
  const { id } = request.params;

  const { body } = request; // { inc_votes: 1 }
  try {
    const result = await VoteOnThisArticleSL(id, body);
    response.status(200).send({ article: result });
  } catch (error) {
    next(error);
  }
};

//this is getAllArticles is being exported
