const db = require("../db/connection");
//import the db connection because this file deals with SQL queries

//key word fetch here used for naming because we are actually fetching from db
exports.fetchAllArticles = async () => {
  const resultobj = await db.query(
    `SELECT 
  articles.article_id,
  articles.author,
  articles.title,
  articles.topic,
  articles.created_at,
  articles.votes,
  articles.article_img_url,
  CAST(COUNT(comments.body) AS int) AS comment_count
FROM articles
LEFT JOIN comments ON articles.article_id = comments.article_id
GROUP BY articles.article_id
ORDER BY articles.created_at DESC`,
  );
  const { rows } = resultobj;
  return rows;
};

//returning out the result of the query to be invoked by services
// and then used by controller file
