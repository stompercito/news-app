"use strict";

var _ajax = require("./services/ajax.js");

var newsList = "<ul>\n  {{items}}\n</ul>";
var newsListItem = "<li><a href=\"{{url}}\">{{title}}</a></li>";

function getHeadlines() {
  var url = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=59a12e101caf4769b2cf2cb82b677ef3';

  _ajax.ajax.get(url).then(function (data) {
    parseHeadlines(data.articles);
  });
}

function parseHeadlines(data) {
  var itemsHTML = '';
  data.map(function (item) {
    itemsHTML += newsListItem.replace('{{url}}', item.url).replace('{{title}}', item.title);
  });
  var newsHTML = newsList.replace('{{items}}', itemsHTML);
  document.getElementById('news-container').innerHTML = newsHTML;
  console.log('News HTML', newsHTML);
}

getHeadlines();