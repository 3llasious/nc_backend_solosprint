function createLookupObj(Arr, keyrefStr, valrefStr) {
  let lookupObj = {};
  //valref and keyref are both references to keys in objects inside the original array
  Arr.forEach((obj) => {
    lookupObj[obj[keyrefStr]] = obj[valrefStr];
    //loops through the array and returns an object of
    // key value pairs equal to our two key value variables
  });

  return lookupObj;
  // returns a lookup object
}

//original solution
// let titleidObj = {}; // <---- create a look up object with article title as the key and id as its vale
// articlesArr.forEach((article) => {
//   titleidObj[article.title] = article.article_id;
// }); // <----- loop through every object in the array and stored it's article id as article name in the titleidobject above (lookup object)

function methodNotAllowed(req, res, next) {
  res.status(405).send({ msg: "method not allowed" });
}

module.exports = { createLookupObj, methodNotAllowed };
