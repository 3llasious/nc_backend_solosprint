// write your tests in here!
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");
const request = require("supertest");
const app = require("../app.js");
const articles = require("../db/data/test-data/articles.js");

beforeEach(() => {
  return seed(data);
}); //invoking with seed data before each test is run.   ARRANGE

afterAll(() => {
  return db.end();
}); //otherwise test will just hang

describe("/api/invalid/", () => {
  test("GET: responds with status 404 for any invalid endpoint input", async () => {
    //method to be tested and expected behaviour from the API
    //ACT
    const sendRequest = await request(app)
      .get("/api/somethinginvalid")
      .expect(404); //simulated sending a request and receiving a response

    const { body } = sendRequest;
    const { msg } = body;
    //ASSERT
    expect(msg).toBe("Path not found");
  });
});
//SEE ALL TOPICS
describe("/api/topics/", () => {
  test("GET: responds with status 200 and fetches all topics", async () => {
    //method to be tested and expected behaviour from the API
    //ACT
    const sendRequest = await request(app).get("/api/topics").expect(200); //simulated sending a request and receiving a response

    const { body } = sendRequest;

    const { topics } = body;
    //ASSERT
    topics.forEach((topic) => {
      expect(typeof topic.slug).toBe("string");
      expect(typeof topic.description).toBe("string");
      expect(typeof topic.img_url).toBe("string");
      //Testing the shape of the object which allowed db values to change without breaking the tests
    });
  });
});
//SEE ALL ARTICLES
describe("/api/articles/", () => {
  test("GET: responds with status 200 and fetches all articles", async () => {
    //method to be tested and expected behaviour from the API
    //ACT
    const sendRequest = await request(app).get("/api/articles").expect(200); //simulated sending a request and receiving a response

    const { body } = sendRequest;
    const { articles } = body;
    console.log(articles);
    //ASSERT
    articles.forEach((article) => {
      expect(typeof article.article_id).toBe("number");
      expect(typeof article.title).toBe("string");
      expect(typeof article.topic).toBe("string");
      expect(typeof article.author).toBe("string");
      expect(typeof article.created_at).toBe("string");
      expect(typeof article.comment_count).toBe("number");
      expect(typeof article.article_img_url).toBe("string");
      //Testing the shape of the object which allowed db values to change without breaking the tests
    });
    expect(articles).toBeSortedBy("created_at", { descending: true });
  });
});
describe("/api/articles/:id", () => {
  test("GET: responds with status 200 and fetches specific article by id", async () => {
    //method to be tested and expected behaviour from the API
    //ACT
    const sendRequest = await request(app).get("/api/articles/3").expect(200); //simulated sending a request and receiving a response

    const { body } = sendRequest;
    const { article } = body;
    //ASSERT

    expect(typeof article.article_id).toBe("number");
    expect(typeof article.title).toBe("string");
    expect(typeof article.topic).toBe("string");
    expect(typeof article.author).toBe("string");
    expect(typeof article.created_at).toBe("string");
    expect(typeof article.article_img_url).toBe("string");
    //Testing the shape of the object which allowed db values to change without breaking the tests
  });
  test("GET: for an id that doesn't exist responds with status 404", async () => {
    //method to be tested and expected behaviour from the API
    //ACT
    const sendRequest = await request(app)
      .get("/api/articles/99999")
      .expect(404); //simulated sending an invalid request and receiving a response

    const { body } = sendRequest;
    const { msg } = body;
    //ASSERT
    expect(msg).toBe("ID not found");
  });
});
//VEIW COMMENTS
describe("/api/articles/:id/comments", () => {
  test("GET: responds with status 200 and fetches all comments for specific article by id", async () => {
    //method to be tested and expected behaviour from the API
    //ACT
    const sendRequest = await request(app)
      .get("/api/articles/3/comments")
      .expect(200); //simulated sending a request and receiving a response

    const { body } = sendRequest;
    const { comments } = body;
    //ASSERT
    comments.forEach((comment) => {
      expect(typeof comment.article_id).toBe("number");
      expect(typeof comment.comment_id).toBe("number");
      expect(typeof comment.author).toBe("string");
      expect(typeof comment.votes).toBe("number");
      expect(typeof comment.created_at).toBe("string");
      expect(typeof comment.body).toBe("string");
    });

    expect(comments).toBeSortedBy("created_at", { descending: true });

    //Testing the shape of the object which allowed db values to change without breaking the tests
  });
  test("GET: responds with status 200 and a message when article has no comments", async () => {
    //method to be tested and expected behaviour from the API
    //ACT
    const sendRequest = await request(app)
      .get("/api/articles/10/comments")
      .expect(200); //simulated sending a request and receiving a response with no comments

    const { body } = sendRequest;
    const { msg } = body;
    //ASSERT
    expect(msg).toBe("oops, nothing to see here yet! add a comment!");

    //Testing the shape of the object which allowed db values to change without breaking the tests
  });
  test("GET: for an id that doesn't exist responds with status 404", async () => {
    //method to be tested and expected behaviour from the API
    //ACT
    const sendRequest = await request(app)
      .get("/api/articles/99999/comments")
      .expect(404); //simulated sending an invalid request and receiving a response

    const { body } = sendRequest;
    const { msg } = body;
    //ASSERT
    expect(msg).toBe("ID not found");
  });
  test("GET: for an id endpoint that doesn't exist responds with status 404", async () => {
    //method to be tested and expected behaviour from the API
    //ACT
    const sendRequest = await request(app)
      .get("/api/articles/99999/commented")
      .expect(404); //simulated sending an invalid request and receiving a response

    const { body } = sendRequest;
    const { msg } = body;
    //ASSERT
    expect(msg).toBe("Path not found");
  });
});

//POST A COMMENT
describe("/api/articles/:id/comments", () => {
  //:id sits on the param key on requests
  test("POST: responds with status 201 and posts a comment on specific article identified by id", async () => {
    //method to be tested and expected behaviour from the API
    //ACT
    const postComment = {
      body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
      author: "butter_bridge",
    };
    // an array of a single obj waith elements to be inserted into the comments table

    const sendRequest = await request(app)
      .post("/api/articles/3/comments")
      .send(postComment)
      .expect(201); //simulated sending a request and receiving a created response

    const { body } = sendRequest;
    const { comment } = body;
    //ASSERT

    expect(typeof comment.article_id).toBe("number");
    expect(typeof comment.comment_id).toBe("number");
    expect(typeof comment.author).toBe("string");
    expect(typeof comment.votes).toBe("number");
    expect(typeof comment.created_at).toBe("string");
    expect(typeof comment.body).toBe("string");

    //Testing the shape of the object which allowed db values to change without breaking the tests
  });
  test("POST: for an id that doesn't exist responds with status 404", async () => {
    //method to be tested and expected behaviour from the API
    //ACT
    const postComment = {
      body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
      author: "butter_bridge",
    };
    const sendRequest = await request(app)
      .post("/api/articles/99999/comments")
      .send(postComment)
      .expect(404); //simulated sending an invalid request and receiving a response

    const { body } = sendRequest;

    const { msg } = body;
    //ASSERT
    expect(msg).toBe("ID not found");
  });
  test("POST: for an id endpoint that doesn't exist responds with status 404", async () => {
    //method to be tested and expected behaviour from the API
    //ACT
    const postComment = {
      body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
      author: "butter_bridge",
    };
    const sendRequest = await request(app)
      .post("/api/articles/99999/commented")
      .send(postComment)
      .expect(404); //simulated sending an invalid request and receiving a response

    const { body } = sendRequest;
    const { msg } = body;

    //ASSERT
    expect(msg).toBe("Path not found");
  });
});

describe("/api/articles/:id", () => {
  //:id sits on the param key on requests
  test("PATCH: responds with status 200 and increases the articles vote by 1", async () => {
    //method to be tested and expected behaviour from the API
    //ACT

    // an array of a single obj waith elements to be inserted into the comments table

    const sendRequest2 = await request(app).get("/api/articles/3").expect(200); //simulated sending a request and receiving a response

    const body1 = sendRequest2.body;
    const article2 = body1.article;
    //to get current count
    //ASSERT
    const currentCount = article2.votes;

    const upvote = { inc_votes: 1 };

    const sendRequest = await request(app)
      .patch("/api/articles/3")
      .send(upvote)
      .expect(200); //simulated sending an upvote request

    const { body } = sendRequest;
    const { article } = body;

    //ASSERT

    const newCount = currentCount + 1;

    //the upvote worked and added one to the votes of the article

    expect(article.votes).toBe(newCount);

    //Testing the shape of the object which allowed db values to change without breaking the tests
  });
});

describe("/api/users/", () => {
  test("GET: responds with status 200 and fetches all users", async () => {
    //method to be tested and expected behaviour from the API
    //ACT
    const sendRequest = await request(app).get("/api/users").expect(200); //simulated sending a request and receiving a response

    const { body } = sendRequest; //<-- this is the full key result

    const { users } = body; //<--- this is trying to get rows that we labelled as users in controller
    //ASSERT
    users.forEach((user) => {
      expect(typeof user.username).toBe("string");
      expect(typeof user.name).toBe("string");
      expect(typeof user.avatar_url).toBe("string");

      //Testing the shape of the object which allowed db values to change without breaking the tests
    });
  });
});
