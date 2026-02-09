const { removeComment } = require("../models/comments.model.js");
const NotFoundError = require("../errors/NotFoundErrorClass.js");

exports.deleteComment = async (id) => {
  const comment = await removeComment(id);
  if (comment === undefined) {
    throw new NotFoundError("comment not found");
  } else {
    return comment;
  }
};
