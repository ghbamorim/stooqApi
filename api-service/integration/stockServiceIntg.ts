import axios from "axios";

export default class StockServiceIntg {
  getStock = async (quote: string) => {
    try {
      const uri = process.env.STOCK_SERVICE_URI || "http://127.0.0.1:3002";
      const response = await axios.get(`${uri}/stock?q=${quote}`);
      return response.data;
    } catch (error) {
      throw "error while comunicating with stock-server";
    }
  };
}
