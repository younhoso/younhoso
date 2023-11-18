const express = require('express');
const request = require('request');
const router = express.Router();

const api_url = process.env.NAVER_API_URL;
const client_id = process.env.NAVER_CLIENT_ID;
const client_secret = process.env.NAVER_CLIENT_SECRET;

/* POST home page */
router.post('/', (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173"); //CORS의 Heade에 Origin 출처를 맞추기 위함.
  request.post({
    url: api_url,
    body: JSON.stringify(req.body),
    headers: {
      'X-Naver-Client-Id': client_id,
      'X-Naver-Client-Secret': client_secret,
      'Content-Type': 'application/json'
    }
  },
  function (error, response, body) {
    if(!error && response.statusCode === 200){
      console.log(response.statusCode);
      console.log(JSON.parse(body));
      res.json(JSON.parse(body))
    } else {
      res.status(response.statusCode).end();
    }
  });
})

module.exports = router;