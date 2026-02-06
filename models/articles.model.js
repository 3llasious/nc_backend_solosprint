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

exports.fetchThisArticle = async (id) => {
  const { rows } = await db.query(
    `
  SELECT * FROM articles
  WHERE article_id = $1
  `,
    [id],
  );

  return rows;
};

exports.fetchThisCommentsSection = async (id) => {
  const { rows } = await db.query(
    `SELECT comments.comment_id,
      comments.votes,
      comments.created_at,
      comments.author,
      comments.body,
      comments.article_id
    FROM comments
    WHERE article_id = $1
    ORDER BY created_at DESC`,
    [id],
  );
  return rows;
};

exports.fetchThisCommentOnThisArticle = async (id, body) => {
  //body is the comment obj :);
  body.article_id = id;
  //replace the id value here to align with query
  const { rows } = await db.query(
    `INSERT INTO comments
    (article_id , body, author) VALUES 
    ($1,$2,$3) RETURNING *`,
    [body.article_id, body.body, body.author],
  );

  return rows;
};

exports.fetchTheVoteUpdatedArticle = async (id, body) => {
  body.inc_votes;
  const { rows } = await db.query(
    `UPDATE articles 
     SET votes = votes + $1
     WHERE article_id = $2
     RETURNING *;`,
    [body.inc_votes, id],
  );

  return rows;
};

//returning out the result of the query to be invoked by services
// and then used by controller file
