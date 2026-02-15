const express = require("express");
const app = require("./app.js");
//importing our app.js set-up (our entry file) to our (essentially)
// run file - we use script set up in package json
// npm run dev to run this

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is listening on port ${PORT}...`);
});
