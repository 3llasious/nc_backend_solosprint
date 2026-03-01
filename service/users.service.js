const {
  fetchAllUsers,
  fetchThisUser,
  insertThisUser,
} = require("../models/users.model.js");

exports.getAllUsers = () => {
  return fetchAllUsers();
};

exports.getThisUser = (username) => {
  return fetchThisUser(username);
};

exports.addThisUser = (body) => {
  return insertThisUser(body);
};
