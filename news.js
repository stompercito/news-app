const axios = require('axios');
require('dotenv').config();
const cors = require('cors');

const apiUrl = process.env.API_URL;
const apiKey = process.env.API_KEY;

function setNewsEndpoints(app) {
  app.use(cors());
  
  app.get('/recientes', function(req, res) {
    const url = `${apiUrl}/top-headlines?country=mx&apiKey=${apiKey}`;
    axios.get(url).then(response => {
      res.render('index', {
        noticias: response.data.articles
      });
    }).catch(err => {
      res.send('Failure');
    });
  });
  
  app.get('/', function(req, res) {
    const url = `${apiUrl}everything?q=bitcoin&sortBy=publishedAt&apiKey=${apiKey}`;
    axios.get(url).then(response => {
      res.render('news', {
        noticias: response.data.articles
      });
    }).catch(err => {
      res.send('Failure');
    });
  });

  app.get('/top-headlines/:country', function(req, res) {
    let country = req.params.country;
    const url = `${apiUrl}/top-headlines?country=${country}&apiKey=${apiKey}`;
    axios.get(url).then(response => {
      res.send(response.data);
      console.log(response.data);
      res.render('index', {
        noticias: response.data.articles
      });
    }).catch(err => {
      res.send('Failure');
    });
  });

  app.get('/noticias/:query', function(req, res) {
    let query = req.params.query;
    //https://newsapi.org/v2/everything?q=bitcoin&apiKey=eb0bc5b6e99a4558a058c8f08cfa1e92
    const url = `${apiUrl}/everything?q=${query}&apiKey=${apiKey}`;
    axios.get(url).then(response => {
      res.send(response.data);
      console.log(response.data);
      res.render('index', {
        noticias: response.data.articles
      });
    }).catch(err => {
      res.send('Failure');
    });
  });

  app.get('/noticias/:query:source', function(req, res) {
    let query = req.params.query;
    let source = req.params.source;
    //https://newsapi.org/v2/everything?q=bitcoin&apiKey=eb0bc5b6e99a4558a058c8f08cfa1e92
    const url = `${apiUrl}/everything?q=${query}&source=${source}&apiKey=${apiKey}`;
    axios.get(url).then(response => {
      res.send(response.data);
      console.log(response.data);
      res.render('index', {
        noticias: response.data.articles
      });
    }).catch(err => {
      res.send('Failure');
    });
  });

  app.get('/fuentes', function(req, res) {
    //https://newsapi.org/v2/sources?apiKey=eb0bc5b6e99a4558a058c8f08cfa1e92
    const url = `${apiUrl}/sources?apiKey=${apiKey}`;
    axios.get(url).then(response => {
      res.send(response.data);
      console.log(response.data);
      res.render('index', {
        noticias: response.data.articles
      });
    }).catch(err => {
      res.send('Failure');
    });
  });


}


module.exports = setNewsEndpoints;