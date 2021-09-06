/*comes from stock-service */
export interface IRawQuote {
  Name: string;
  Symbol: string;
  Date: string;
  Time: string;
  Open: number;
  High: number;
  Low: number;
  Close: number;
  Volume: number;
}

export interface IQuote {
  date?: Date;
  name?: string;
  symbol?: string;
  open?: number;
  high?: number;
  low?: number;
  close?: number;
}

export default class Quote implements IQuote {
  date?: Date;
  name?: string;
  symbol?: string;
  open?: number;
  high?: number;
  low?: number;
  close?: number;
  /*for constructing from stock-service*/
  constructor(obj: IRawQuote) {
    this.name = obj.Name;
    this.symbol = obj.Symbol;
    this.open = obj.Open;
    this.high = obj.High;
    this.low = obj.Low;
    this.close = obj.Close;
  }
}
