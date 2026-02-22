# NC News Seeding

View the live version here: https://nc-backend-solosprint.onrender.com

Description:
This is the back-end for a reddit-style news and media aggregation platflorm.
Available methods include,

GET routes:

- for all articles
  /api/articles
- for a particular article
  /api/articles/:article_id
- for all comments on an article
  /api/articles/:article_id/comments
- for all topics
  /api/topics
- for all users
  /api/users

queries:
sort_by=:existing_column
order=:ASC || ASC

- and can be chained

default behaviour sort by column is created_at and in descending order

POST routes:

- to post a comment on an article
  /api/articles/:article_id/comments

PATCH routes:

- to upvote or downvote an article
  /api/articles/:article_id

DELETE routes:

- to delete a comment
  /api/articles/:comment_id

to be added, upvote/downvote a comment, update a comment, get a user

System Requirements:
Node.js v25.2.1
PostgreSQL 14.20

Create environment files:
.env.development
touch .env.test

- install dotenv, will be in package json but double check
- do not forget to git ignore!!

Seed the db:
npm run set-up db (in scripts)
npm run seed (in scripts)

Run tests:
npm test

- Not passing tests? run in the correct order, see above ^
- Make sure jest and supertest have been intstalled

Start dev server:
npm run dev (in scripts)

Hosting:
create a .env.production host backend on service such as superbase and assign DATABASE_URL.
set DATABASE_URL in your hosting platform's environment variables dashboard.
