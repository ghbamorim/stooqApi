import express from "express";
import UserController from "../controllers/usersController";
import { isEmailValid } from "../utils/validations";

const router = express.Router();

/* Register new user. Retrieves jwt token*/
router.post("/register", function (req: any, res: any, next: any) {
  try {
    const email = req.query.e;
    if (!email) {
      return res.status(401).send({ error: "email not informed" });
    } else if (!isEmailValid(email)) {
      return res.status(401).send({ error: "invalid email" });
    } else {
      const userController = new UserController();
      const result = userController.doLogin(email);
      res.status(200).json(result);
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

export default router;
