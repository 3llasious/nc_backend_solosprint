//controller file looks at input from router later
//and constructs the response does not carry out any SQL
//that's done by the model layer
const {
  getAllTopics: getAllTopicsServiceLayer,
} = require("../service/topics.service");

//getting the result of a query from the service layer which is a different function
//than the one below called the same thing getAllTopics so it's
// good practise to rename the function being imported

exports.getAllTopics = async (req, res) => {
  // define the callback used by router file and parse parameters
  // so here we can access he actual request
  const queryResult = await getAllTopicsServiceLayer();
  // invokes the callback in service file to get the
  // result from the query and has accessed off of the rows key to
  // get our array of topics info
  // and then HERE we construct/mostly send off the response here in controller

  if (queryResult !== undefined) {
    res.status(200).send({ topics: queryResult });
  } else {
    res.status(404).send({ msg: "Sorry, that's not a valid request" });
  }
};
