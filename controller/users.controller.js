const {
  getAllUsers: getAllUsersServiceLayer,
  addThisUser: addThisUserSL,
  getThisUser: getThisUserSL,
} = require("../service/users.service");

exports.getAllUsers = async (req, res) => {
  try {
    const result = await getAllUsersServiceLayer();

    res.status(200).send({ users: result });
  } catch (err) {
    console.log("the Error", err);
    res.status(404).send({ msg: "oopps not a valid request" });
  }
};

exports.getThisUser = async (req, res) => {
  const { username } = req.params;
  try {
    const result = await getThisUserSL(username);
    res.status(200).send({ user: result });
  } catch (err) {
    console.log("the Error", err);
    res.status(404).send({ msg: "ID not found" });
  }
};

exports.addThisUser = async (req, res) => {
  const { body } = req;

  try {
    const result = await addThisUserSL(body);
    res.status(201).send({ user: result });
  } catch (err) {
    res.status(400).send({ msg: "Bad request" });
  }
};
