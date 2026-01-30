const {
  createLookupObj,
} = require("/Users/emmanuellaitopa/Northcoders/backend/nc-news-BE/db/seeds/utils.js");

describe.only("createLookupObj()", () => {
  test("when passed in an empty array, returns an empty obj", () => {
    const dataArr = [];

    const key = "topic";

    const value = "title";

    const output = createLookupObj(dataArr, key, value);

    expect(output).toEqual({});
  });
  test("when passed in an array with one object, returns correct obj", () => {
    const dataArr = [{ title: "babe", topic: "relationships" }];

    const key = "topic";

    const value = "title";

    const output = createLookupObj(dataArr, key, value);

    expect(output).toEqual({ relationships: "babe" });
  });
  test("when passed in an array with multiple objects, returns correct obj", () => {
    const dataArr = [
      { title: "babe", topic: "relationships" },
      { title: "1984", topic: "dystopian" },
      { title: "1001 essays", topic: "self-help" },
    ];

    const key = "topic";

    const value = "title";

    const output = createLookupObj(dataArr, key, value);

    expect(output).toEqual({
      relationships: "babe",
      dystopian: "1984",
      "self-help": "1001 essays",
    });
  });
});
