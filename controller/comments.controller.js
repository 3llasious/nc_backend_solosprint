const {
  deleteComment: deleteCommentServiceLayer,
} = require("../service/comments.service.js");

exports.deleteComment = async (req, res, next) => {
  const { comment_id } = req.params;
  // define the callback used by router file and parse parameters
  // so here we can access he actual request
  try {
    const queryResult = await deleteCommentServiceLayer(comment_id);
    console.log(queryResult);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
  // should be the deleted comment
};
