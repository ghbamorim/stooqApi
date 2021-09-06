import { IQuote } from "../models/quote";
import { IUser } from "../models/user";
import { jdb } from "./jsondb";

/*better if separated this way, just in case of changing the ORM or database */
class Db {
  private users: IUser[] = jdb.getObject<IUser[]>("/users");
  insert = (user: IUser) => {
    this.users.push(user);
    this.commit();
  };
  commit = () => {
    jdb.push("/users", this.users);
  };
  findByEmail = (email: string) => {
    return this.users.find((element) => element.email === email);
  };

  topQuotes = (max: number) => {
    let quoteArray: any[] = [];
    for (const user of this.users) {
      quoteArray = quoteArray.concat(
        user.queries.map((item: IQuote) => {
          return item.symbol;
        })
      );
    }

    let counted: any[] = [];

    for (const iterator of quoteArray) {
      const found = counted.find((item) => item.stock === iterator);
      if (found) {
        found.times_requested = found.times_requested + 1;
      } else {
        counted.push({ stock: iterator, times_requested: 1 });
      }
    }

    counted = counted
      .sort((a, b) => {
        if (a.times_requested > b.times_requested) {
          return -1;
        }
        if (a.times_requested < b.times_requested) {
          return 1;
        }
        return 0;
      })
      .slice(0, max);

    return counted;
  };
}

const db = new Db();

export default db;
