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

// const isValidArticleColumn = async (column) => {
//   try {
//     await db.query(`SELECT ${column} FROM articles LIMIT 1`);
//     return true;
//   } catch (err) {
//     return false;
//   }
// };
const isValidArticleColumn = (column) => {
  const validcolumns = [
    "article_id",
    "title",
    "topic",
    "author",
    "created_at",
    "body",
    "votes",
    "article_img_url",
  ];
  if (validcolumns.includes(column)) {
    return true;
  }
  // Invalid column will throw error and return false
  return false;
};
module.exports = { isValidArticleColumn, DoesArticleExist };
