const express = require("express");

const router = express.Router();

const {
  deleteComment,
  getAllComments,
  //   getCommentsByAuthor,
} = require("../controller/comments.controller.js");

router.get("/", getAllComments);
router.delete("/:comment_id", deleteComment);

module.exports = router;

// router.get("/:author", getCommentsByAuthor);
