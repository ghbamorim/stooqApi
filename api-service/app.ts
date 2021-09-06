require("dotenv").config({ path: __dirname + "/.env" });
const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");
import fs = require("fs");
import indexRouter from "./routes/index";
import usersRouter from "./routes/usersRoutes";
import swaggerUi = require("swagger-ui-express");

/* Swagger files start */
const swaggerFile: any = process.cwd() + "/swagger/swagger.json";
const swaggerData: any = fs.readFileSync(swaggerFile, "utf8");
const swaggerDocument = JSON.parse(swaggerData);
/* Swagger files end */

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/", usersRouter);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// catch 404 and forward to error handler
app.use(function (req: any, res: any, next: any) {
  next(createError(404));
});

// error handler
app.use(function (err: any, req: any, res: any, next: any) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
