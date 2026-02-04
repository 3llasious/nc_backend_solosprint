const { fetchAllTopics } = require("../models/topics.model.js");

exports.getAllTopics = () => {
  return fetchAllTopics();
  //all it does right now is invoke our model functions that do the queries
  //but this is where you handle things like authentication and other business logic
};
