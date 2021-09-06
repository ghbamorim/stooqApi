import { IQuote } from "./quote";

export interface IUser {
  email?: string;
  password?: string;
  queries: IQuote[];
  superUser?: boolean;
}

export default class User implements IUser {
  email?: string;
  password?: string;
  queries: IQuote[] = [];
  superUser?: boolean;
}
