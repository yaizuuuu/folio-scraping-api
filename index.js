const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const setting = require('./setting');

const app = express();
app.disable('etag');
app.use(morgan('combined'));
app.use(cors());

app.get('/theme/:themeName', async (req, res) => {
  const html = await fetchHTML(req.params.themeName);
  const result = scraping(html);

  res.type('json');
  res.send(JSON.stringify({result}));
});

app.listen(80, () => {
  console.log('Listening on port 80');
});

/**
 * 受け取ったパスからHTMLを取得する
 */
async function fetchHTML(path) {
  const response = await axios.get(`${setting.baseUrl}/${path}`);
  return response.data;
}

/**
 * 受け取ったHTMLから目的のデータを抽出する
 */
function scraping(html) {
  const list = [];
  const $ = cheerio.load(html);

  // HTMLから銘柄が格納されるtrを取得する
  const brandTr = $(setting.trSelector);

  // 銘柄を一行ずつ処理する
  brandTr.each((key, tr) => {
    // 銘柄の詳細情報が格納されるtdを取得する
    const td = $(tr).children(setting.tdSelector);

    // カラム順にtdから情報を取得する
    const row = {};
    setting.columns.forEach((column, index) => {
      Object.assign(row, {[column]: td.eq(index).text()});
    });

    list.push(row);
  });

  return list;
}