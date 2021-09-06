import { JsonDB } from "node-json-db";
import { Config } from "node-json-db/dist/lib/JsonDBConfig";
import User, { IUser } from "../models/user";

export const jdb = new JsonDB(new Config("Stock", true, false, "/"));
const users = jdb.getObject<IUser[]>("/");

if (!("users" in users)) {
  const superUser = new User() as IUser;
  superUser.email = "ghnerique@gmail.com";
  superUser.superUser = true;

  jdb.push("/users", [superUser]);
}
