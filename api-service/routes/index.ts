import express from "express";
import UserController from "../controllers/usersController";
import StockServiceIntg from "../integration/stockServiceIntg";
import { verifyToken } from "../middleware/auth";
import Quote from "../models/quote";
import { IUser } from "../models/user";

const indexRouter = express.Router();

/* Query a stock quote. Bearer token should be provided on auth header*/
/*params: q => stock quote symbol */
indexRouter.get(
  "/stock",
  verifyToken,
  async function (req: any, res: any, next: any) {
    try {
      /*req.email comes from verifyToken middleware*/
      const email = req.email;
      const quoteParam = req.query.q;
      const userController = new UserController();
      const stockService = new StockServiceIntg();
      const stockResult = await stockService.getStock(quoteParam);

      const user = userController.findByEmail(email);
      if (user) {
        /*add quote to user model, for history and stats */
        userController.addQuote(user, stockResult);
      }
      const quote = new Quote(stockResult);
      res.status(200).json(quote);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
);

/* User queries history. Bearer token should be provided on auth header*/
indexRouter.get(
  "/history",
  verifyToken,
  async function (req: any, res: any, next: any) {
    try {
      /*req.email comes from verifyToken middleware*/
      const email = req.email;
      const userController = new UserController();
      const user: IUser | undefined = userController.findByEmail(email);
      res.status(200).json(user?.queries);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
);

/* top 5 queried stock quotes. Bearer token should be provided on auth header*/
indexRouter.get(
  "/stats",
  verifyToken,
  async function (req: any, res: any, next: any) {
    try {
      /*req.superUser comes from verifyToken middleware*/
      if (req.superUser) {
        const userController = new UserController();
        const result = userController.topQuotes(5);
        res.status(200).json(result);
      } else {
        res.status(403).json({ error: "user is not superuser" });
      }
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
);

export default indexRouter;
