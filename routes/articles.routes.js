const express = require("express");

const {
  getAllArticles,
  getThisArticle,
  getCommentsForThisArticle,
  postCommentOnThisArticle,
  VoteOnThisArticle,
} = require("../controller/articles.controller.js");

const router = express.Router();

//express has a method to construct routes called Router()

router.get("/", getAllArticles);

router.get("/:id", getThisArticle); //uses the endpoint here to descide which controller to jump into

router.patch("/:id", VoteOnThisArticle);

router.get("/:id/comments", getCommentsForThisArticle);

router.post("/:id/comments", postCommentOnThisArticle);

//a refrence to a model function
// (a function in out model layer that fetches articles from the db)

module.exports = router;

//export the router function
