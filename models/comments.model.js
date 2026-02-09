const db = require("../db/connection");

exports.removeComment = async (id) => {
  const deletethiscomment = await db.query(
    `DELETE FROM comments
     WHERE comment_id = $1
     RETURNING *`,
    [id],
  );
  return deletethiscomment.rows[0];
};
