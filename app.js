const express = require("express");
const app = express();
const topicsRouter = require("./routes/topics.routes.js");
//renaming router we exported from topics.route.js which is called router
//to be topicsRouter in this file for clarity

//set
const articlesRouter = require("./routes/articles.routes.js");

const usersRouter = require("./routes/users.routes.js");

const NotFoundError = require("./errors/NotFoundErrorClass.js");

app.use(express.json()); //enable set-up for posting or patching

app.use("/api/topics", topicsRouter);
// start point/ entry file
// if it has this start part of the URL go to this router
// this router we made and required in at the start

app.use("/api/articles", articlesRouter);

app.use("/api/users", usersRouter);

//this app.use takes a callback function that handles the error
//message or passes it down to the next error chain
// error handlers come AFTER routes

// INVALID CATCH ALL
// This is where app.all must come in to catch all other endpoint errors
// it means for all other paths apart from the above trigger this default middleware
// same main chain as the above different chain to the below
app.all("/*path", (req, res, next) => {
  //it operates at the global application level, meaning:
  //It's not limited to a specific router - it applies to the entire Express app
  //It catches ALL HTTP methods - GET, POST, PUT, DELETE, PATCH, OPTIONS, etc.
  //It catches ALL unmatched paths - any route that wasn't handled by middleware/routes above it
  res.status(404).send({ msg: "Path not found" });
});
app.use((err, req, res, next) => {
  if (err instanceof NotFoundError) {
    res.status(404).send({ msg: err.message });
    //
  } else {
    next(err);
  }
});

module.exports = app;
