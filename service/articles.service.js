const {
  fetchAllArticles,
  fetchThisArticle,
  fetchThisCommentsSection,
  fetchThisCommentOnThisArticle,
  fetchTheVoteUpdatedArticle,
} = require("../models/articles.model.js");

const {
  DoesArticleExist,
  isValidArticleColumn,
  isValidTopicTitle,
} = require("../utilsglobal.js");

const NotFoundError = require("../errors/NotFoundErrorClass.js");
const BadRequestError = require("../errors/BedRequestError.js");

exports.getAllArticles = async (query) => {
  let { order = "desc", sort_by = "created_at", topic } = query;

  const isvalid = await isValidArticleColumn(sort_by);

  if (!isvalid || (order !== "desc" && order !== "asc")) {
    throw new BadRequestError("Invalid parameters"); //validation layer to stop SQL injections
  }

  // Only validate topic if it's provided
  if (topic) {
    //if topic is passed in/it exists then
    const isvalidTopic = await isValidTopicTitle(topic);
    if (!isvalidTopic) //if it is not valid then throw error
    {
      throw new NotFoundError("Topic does not exist");
    }
  }

  return await fetchAllArticles(order, sort_by, topic);
};

exports.getThisArticle = async (id) => {
  //this whole thing is the packaged result we got handed from the model layer
  const article = await fetchThisArticle(id);

  if (article.length === 0) {
    throw new NotFoundError("ID not found");
  } else {
    return article[0];
  }
};

exports.getCommentsForThisArticle = async (id) => {
  const exists = await DoesArticleExist(id);
  if (!exists) {
    //check if it exists using the utils function
    throw new NotFoundError("ID not found");
  }

  const comments = await fetchThisCommentsSection(id);
  return comments;
  //if article exists return comments else move on and catch error
};

exports.postCommentOnThisArticle = async (id, body) => {
  try {
    const comment = await fetchThisCommentOnThisArticle(id, body);
    return comment[0];
  } catch {
    throw new NotFoundError("ID not found");
  }
  //the comment array with one value
};

exports.VoteOnThisArticle = async (id, body) => {
  try {
    const article = await fetchTheVoteUpdatedArticle(id, body);
    return article[0];
  } catch {
    throw new NotFoundError("ID not found");
  }
};
//exported to be used by our controller layer controller
