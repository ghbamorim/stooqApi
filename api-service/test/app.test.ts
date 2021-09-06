/*Stock-service must be activated before running these tests.
run node stock-service on stock-service directory */

const app = require("../app");
const request = require("supertest");

let token = "";

test("should return token for access", async () => {
  const res = await request(app).post("/register?e=ghnerique@gmail.com");
  token = res.body.password;
  expect(res.statusCode).toEqual(200);
  expect(res.body).toHaveProperty("email");
  expect(res.body).toHaveProperty("password");
});

const validateQuote = (quote: any) => {
  expect(quote).toHaveProperty("name");
  expect(quote).toHaveProperty("symbol");
  expect(quote).toHaveProperty("open");
  expect(quote).toHaveProperty("high");
  expect(quote).toHaveProperty("low");
  expect(quote).toHaveProperty("close");
};

const quotes = [
  "AAIC.US",
  "ABB.US",
  "ABVC.US",
  "ACAH.US",
  "ACAHW.US",
  "ACGLP.US",
  "ACIC-U.US",
  "AAIC.US",
  "ABB.US",
  "ABVC.US",
  "ACAH.US",
  "ACAHW.US",
  "ACGLP.US",
  "AAIC.US",
  "ABB.US",
  "ABVC.US",
  "ACAH.US",
  "ACAHW.US",
  "AAIC.US",
  "ABB.US",
  "ABVC.US",
  "ACAH.US",
];

for (const quote of quotes) {
  test(`query stock ${quote}`, async () => {
    const res = await request(app)
      .get(`/stock?q=${quote}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    validateQuote(res.body);
  });
}

test("user query history", async () => {
  const res = await request(app)
    .get("/history")
    .set("Authorization", `Bearer ${token}`);
  expect(res.statusCode).toEqual(200);
  expect(res.body).toEqual(expect.arrayContaining([expect.any(Object)]));
  const history = res.body;
  for (const entry of history) {
    expect(entry).toHaveProperty("date");
    validateQuote(entry);
  }
});

test("most frequent quotes", async () => {
  const res = await request(app)
    .get("/stats")
    .set("Authorization", `Bearer ${token}`);
  expect(res.statusCode).toEqual(200);
  expect(res.body).toEqual(expect.arrayContaining([expect.any(Object)]));
  const history = res.body;
  expect(history.length).toEqual(5);
  for (const entry of history) {
    expect(entry).toHaveProperty("stock");
    expect(entry).toHaveProperty("times_requested");
  }
});

test("/stock should not pass without authentication token", async () => {
  const res = await request(app).get(`/stock?q=AAIC.US`);
  expect(res.statusCode).toEqual(401);
});

test("/history should not pass without authentication token", async () => {
  const res = await request(app).get("/history");
  expect(res.statusCode).toEqual(401);
});

test("/stats should not pass without authentication token", async () => {
  const res = await request(app).get("/stats");
  expect(res.statusCode).toEqual(401);
});

test("only super user can access /stats", async () => {
  const res = await request(app).post("/register?e=ghbamorim@yahoo.com");
  const token = res.body.password;
  const statsRes = await request(app)
    .get("/stats")
    .set("Authorization", `Bearer ${token}`);
  expect(statsRes.statusCode).toEqual(403);
});
