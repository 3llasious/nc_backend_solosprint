const { fetchAllUsers } = require("../models/users.model.js");

exports.getAllUsers = () => {
  return fetchAllUsers();
};
