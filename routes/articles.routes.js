const express = require("express");

const { getAllArticles } = require("../controller/articles.controller.js");

const router = express.Router();

//express has a method to construct routes called Router()

router.get("/", getAllArticles);

//a refrence to a model function
// (a function in out model layer that fetches articles from the db)

module.exports = router;

//export the router function
