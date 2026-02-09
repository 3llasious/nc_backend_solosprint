const db = require("./db/connection.js");
const DoesArticleExist = async (id) => {
  const exists = await db.query(
    `SELECT * FROM articles WHERE article_id = $1 `,
    [id],
  );
  if (exists.rows.length === 0) {
    return false;
  } else {
    return true;
  }
};

const isValidTopicTitle = async (topic) => {
  try {
    const result = await db.query(
      "SELECT * FROM articles WHERE topic = $1 LIMIT 1",
      [topic],
    );
    if (result.rows.length > 0) {
      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
};

const isValidArticleColumn = (column) => {
  const validcolumns = [
    //"article_id",
    "title",
    "topic",
    "author",
    "created_at",
    //"body", // <--- sort by sensible columns
    "votes",
  ];
  if (validcolumns.includes(column)) {
    return true;
  }
  // Invalid column will throw error and return false
  return false;
};

module.exports = { isValidArticleColumn, DoesArticleExist, isValidTopicTitle };
