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

describe("/api/articles/", () => {
  test("GET: responds with status 200 and fetches all articles", async () => {
    //method to be tested and expected behaviour from the API
    //ACT
    const sendRequest = await request(app).get("/api/articles").expect(200); //simulated sending a request and receiving a response

    const { body } = sendRequest;
    const { articles } = body;
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
