import { ajax } from './services/ajax.js';

const newsList = `<ul>
  {{items}}
</ul>`;

const newsListItem = `<li><a href="{{url}}">{{title}}</a></li>`;

function getHeadlines() {
  const url:string = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=59a12e101caf4769b2cf2cb82b677ef3';

  ajax.get(url).then(data => {
    parseHeadlines(data.articles);
  });
}

function parseHeadlines(data) {
  let itemsHTML = '';
  data.map(item => {
    itemsHTML += newsListItem.replace('{{url}}', item.url).replace('{{title}}', item.title);
  });

  const newsHTML = newsList.replace('{{items}}', itemsHTML);
  document.getElementById('news-container').innerHTML = newsHTML;
  console.log('News HTML', newsHTML);
}

getHeadlines();