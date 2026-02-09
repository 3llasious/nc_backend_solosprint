const express = require("express");

const {
  getAllArticles,
  getThisArticle,
  getCommentsForThisArticle,
  postCommentOnThisArticle,
  VoteOnThisArticle,
} = require("../controller/articles.controller.js");

const router = express.Router();

const { methodNotAllowed } = require("../db/seeds/utils.js");

//express has a method to construct routes called Router()

router.route("/").get(getAllArticles);

router.route("/:id").get(getThisArticle); //uses the endpoint here to descide which controller to jump into

router.route("/:id").patch(VoteOnThisArticle);

router
  .route("/:id/comments")
  .post(postCommentOnThisArticle)
  .get(getCommentsForThisArticle)
  .all(methodNotAllowed);

//a refrence to a model function
// (a function in out model layer that fetches articles from the db)

module.exports = router;

//export the router function
