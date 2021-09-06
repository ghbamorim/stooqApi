const app = require("../app");
const request = require("supertest");

test("/stock route", async () => {
  const res = await request(app).get("/stock?q=aapl.us");
  expect(res.statusCode).toEqual(200);
  expect(res.body).toHaveProperty("Symbol");
  expect(res.body).toHaveProperty("Date");
  expect(res.body).toHaveProperty("Time");
  expect(res.body).toHaveProperty("Open");
  expect(res.body).toHaveProperty("High");
  expect(res.body).toHaveProperty("Low");
  expect(res.body).toHaveProperty("Close");
  expect(res.body).toHaveProperty("Volume");
  expect(res.body).toHaveProperty("Name");
});
