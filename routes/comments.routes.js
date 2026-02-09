const express = require("express");

const router = express.Router();

const {
  deleteComment,
  //   getCommentsByAuthor,
} = require("../controller/comments.controller.js");

router.delete("/:comment_id", deleteComment);

module.exports = router;

// router.get("/:author", getCommentsByAuthor);
