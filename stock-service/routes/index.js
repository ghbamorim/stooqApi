const express = require("express");
const router = express.Router();
const axios = require("axios");

/*retrieves stock quotes from stooq.com. 
Params: q => stock quote symbol */
router.get("/stock", async function (req, res, next) {
  const quote = req.query.q;
  const uri = `https://stooq.com/q/l/?s=${quote}&f=sd2t2ohlcvn&h&e=csv`;

  try {
    const response = await axios.get(uri);
    /*it's not json */
    const lines = response.data.split("\r\n");
    const headers = lines[0].split(",");
    const data = lines[1].split(",");
    const result = {};
    for (const [i, header] of headers.entries()) {
      result[header] = data[i];
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
