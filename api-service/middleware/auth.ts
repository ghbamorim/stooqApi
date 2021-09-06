const jwt = require("jsonwebtoken");
import { Response, NextFunction } from "express";
import UserController from "../controllers/usersController";

/*for debug purposes*/
const useToken = true;

export const verifyToken = (req: any, res: Response, next: NextFunction) => {
  if (useToken) {
    let token = req.headers["authorization"];
    if (token) {
      token = token.split(" ");
      if ((token.lenght = 2)) {
        token = token[1];
      }
    }

    if (!token) {
      return res
        .status(401)
        .json({ auth: false, message: "No token provided." });
    }
    try {
      const decoded = jwt.verify(token, process.env.SECRET);
      /*user email linked to token */
      req.email = decoded.data;
      const userController = new UserController();
      const user = userController.findByEmail(req.email);
      /*it will be useful later */
      req.superUser = user?.superUser;
    } catch (err) {
      return res.status(401).send("Invalid Token");
    }
  }
  return next();
};

export const newToken = (id: string) => {
  return jwt.sign({ data: id }, process.env.SECRET, {
    expiresIn: process.env.TOKEN_EXPIRES_IN || "1h",
  });
};
