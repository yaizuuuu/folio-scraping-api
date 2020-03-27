/**
 * スクレイピング時の設定情報
 * UIに変更があった場合はこちらを変更する
 */
const setting = {
  // folioのベースURL
  baseUrl: 'https://folio-sec.com/theme',

  // 銘柄が格納されるtr
  trSelector: 'tr[class^="Instruments__tr"]',

  // 銘柄の詳細情報が格納されるtd
  tdSelector: 'td[class^="Instruments__td"]',

  // trのカラム, UIの順番とマッチしている
  columns: [
    'brand',    // 銘柄名
    'ratio',    // 割合
    'quantity', // 株数
    'price',     // 価格
  ],
};

module.exports = setting;