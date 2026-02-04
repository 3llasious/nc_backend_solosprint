const express = require("express");

const { getAllTopics } = require("../controller/topics.controller");
// a function that get's all topics from our database
// does something in our model file

const router = express.Router();
//invoking the router method on express to create a new instance of the routing object

router.get("/", getAllTopics);
//this part is like a switch case that's trying to match this string exactly,
//if it doesn't it moves on to the next one

//router.get("/:id", getAllTopics);

module.exports = router;
