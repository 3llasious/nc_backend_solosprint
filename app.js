const express = require("express");
const app = express();
const topicsRouter = require("./routes/topics.routes.js");
//renaming router we exported from topics.route.js which is called router
//to be topicsRouter in this file for clarity

//set
const articlesRouter = require("./routes/articles.routes.js");

app.use(express.json()); //enable set-up for posting or patching

app.use("/api/topics", topicsRouter);
// start point/ entry file
// if it has this start part of the URL go to this router
// this router we made and required in at the start

app.use("/api/articles", articlesRouter);

module.exports = app;
