const db = require("../connection");
const format = require("pg-format");
const { createLookupObj } = require("./utils.js");

const seed = async ({ topicData, userData, articleData, commentData }) => {
  // must create tables in order of least dependency starting from which of these does not require foreign keys/references
  //must drop them before creation (but in the opposite order) but in the rder of the table with the most depedencies
  await db.query(`DROP TABLE IF EXISTS comments`);
  await db.query(`DROP TABLE IF EXISTS articles`);
  await db.query(`DROP TABLE IF EXISTS topics`);
  await db.query(`DROP TABLE IF EXISTS users`);
  await db.query(`CREATE TABLE users(
    username VARCHAR(1000) PRIMARY KEY NOT NULL,
    name VARCHAR(1000),
    avatar_url VARCHAR(1000));`);
  await db.query(`CREATE TABLE topics(
    slug VARCHAR(1000) PRIMARY KEY NOT NULL,
    description VARCHAR(1000),
    img_url VARCHAR(1000));`);
  await db.query(`CREATE TABLE articles(
    article_id SERIAL PRIMARY KEY NOT NULL,
    title VARCHAR(1000),
    topic VARCHAR(1000) REFERENCES topics(slug),
    author VARCHAR(1000) REFERENCES users(username),
    body TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    votes INT DEFAULT 0,
    article_img_url VARCHAR(1000));`);
  await db.query(`CREATE TABLE comments(
    comment_id SERIAL PRIMARY KEY NOT NULL,
    article_id SERIAL REFERENCES articles(article_id),
    votes INT DEFAULT 0,
    body TEXT,
    author VARCHAR(1000)REFERENCES users(username),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`);

  const formattedUsers = userData.map((user) => {
    return [user.username, user.name, user.avatar_url];
  });

  let userQueryStr = format(
    "INSERT INTO users (username, name, avatar_url) VALUES %L ",
    // %L = a placeholder for a list
    formattedUsers,
  );

  await db.query(userQueryStr);

  const formattedTopics = topicData.map((topic) => {
    return [topic.slug, topic.description, topic.img_url];
  });

  let topicsQueryStr = format(
    "INSERT INTO topics (slug, description, img_url) VALUES %L ",
    formattedTopics,
  );

  await db.query(topicsQueryStr); // <---- query the database by invoking the query with the correctly formatted string and await a response because it's async

  const formattedArticles = articleData.map((article) => {
    return [
      article.title,
      article.topic,
      article.author,
      article.body,
      article.created_at,
      article.votes,
      article.article_img_url,
    ];
  });

  let articlesQueryStr = format(
    "INSERT INTO articles (title, topic, author, body, created_at, votes, article_img_url) VALUES %L RETURNING *",
    formattedArticles,
  );

  const articleResult = await db.query(articlesQueryStr); // <---- want to see the result of this query so i stored as a variable it was an object  console.log( articleResult)

  let articlesArr = articleResult.rows; // <----- stored the value of the rows key in the object as this array because i could see it was an array from the console log & the information i need later (article_id) is here
  const lookupObj = createLookupObj(
    articlesArr, //the array
    "title", // the key reference
    "article_id", // the value reference
  );

  const formattedComments = commentData.map((comment) => {
    return [
      lookupObj[comment.article_title], // <------- OH no! we need article id information but the comments data only has article_title
      // use the lookup object here to access article id by getting the article
      // title from the comments obj first and then using that as a key for the id
      comment.body,
      comment.votes,
      comment.author,
      comment.created_at,
    ];
  });

  let commentsQueryStr = format(
    "INSERT INTO comments (article_id, body, votes, author, created_at) VALUES %L RETURNING *",
    formattedComments,
  );
  await db.query(commentsQueryStr);
};
module.exports = seed;
