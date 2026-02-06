const db = require("../connection");
//connection or /c

const getUsers = async ({ topicData, userData, articleData, commentData }) => {
  const selectUsers = await db.query(" SELECT * FROM users");
  console.log("a:", selectUsers);

  const selectCodingArticles = await db.query(
    "SELECT * FROM articles WHERE topic = 'coding'",
  );
  console.log("b:", selectCodingArticles);

  const badComments = await db.query("SELECT * FROM comments WHERE votes < 0");
  console.log("c:", badComments);

  const selectAllTopics = await db.query("SELECT topic FROM articles");

  console.log("d:", selectAllTopics);

  const writtenbyGrumpy = await db.query(
    "SELECT * FROM articles WHERE author = 'grumpy19'",
  );
  console.log("e:", writtenbyGrumpy);

  const popularCommets = await db.query(
    "SELECT * FROM comments WHERE votes > 10",
  );
  console.log("f:", popularCommets);
};

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

module.exports = { getUsers, DoesArticleExist };
