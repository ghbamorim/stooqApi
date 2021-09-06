import { newToken } from "../middleware/auth";
import db from "../db/db";
import Quote, { IRawQuote } from "../models/quote";
import { default as IUser, default as User } from "../models/user";

export default class UserController {
  findByEmail = (email: string): IUser | undefined => db.findByEmail(email);
  doLogin = (email: string) => {
    let user = this.findByEmail(email);
    if (!user) {
      user = new User();
      user.email = email;
      db.insert(user);
    }
    user.password = newToken(email);
    db.commit();

    return {
      email: email,
      password: user.password,
    };
  };

  addQuote = (user: IUser, rawQuote: IRawQuote) => {
    const quote = new Quote(rawQuote);
    quote.date = new Date();
    user.queries.push(quote);
    db.commit();
  };

  topQuotes = (max: number) => {
    return db.topQuotes(max);
  };
}
