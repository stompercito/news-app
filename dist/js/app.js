"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setPageTitle = setPageTitle;

var _ajax = require("./services/ajax.js");

function setPageTitle() {
  // Set title in HTML
  var source = document.getElementById('heading').innerHTML;
  var mainTemplate = Handlebars.compile(source);
  var context = {
    title: 'News Application',
    isNew: true
  };
  document.getElementById('heading').innerHTML = mainTemplate(context);
}

function getHeadlines() {
  var url = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=1e30c02c90b84a46a828833a44569f18';

  _ajax.ajax.get(url).then(function (data) {
    var source = document.getElementById('news-container').innerHTML;
    var template = Handlebars.compile(source);
    var context = {
      headline: data.articles,
      check: function check() {
        return true;
      }
    };
    document.getElementById('news-container').innerHTML = template(context);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  setPageTitle();
  getHeadlines();
});