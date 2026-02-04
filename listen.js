const express = require("express");
const app = require("./app.js");
//importing our app.js set-up (our entry file) to our (essentially)
// run file - we use script set up in package json
// npm run dev to run this

const port = 8000;

app.listen(port, () => {
  console.log("listening on port 800");
});
