const {
  getAllUsers: getAllUsersServiceLayer,
} = require("../service/users.service");

exports.getAllUsers = async (req, res) => {
  try {
    const result = await getAllUsersServiceLayer();

    res.status(200).send({ users: result });
  } catch (err) {
    console.log("the Error", err);
    res.status(404).send({ msg: "opps not a valid reqest" });
  }
};
