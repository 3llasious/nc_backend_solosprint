const {
  deleteComment: deleteCommentServiceLayer,
  getAllCommentsSL,
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

exports.getAllComments = async (req, res, next) => {
  try {
    const result = await getAllCommentsSL();
    res.status(200).send({ comments: result });
  } catch (err) {}
};
