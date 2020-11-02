const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');
const apiRoutes = require('./routes');
const cors = require('cors');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const news = require('./news');

const apiNews = require('./api');

require('dotenv').config();

const connectMongo = require('./src/controllers/db.controller');
//const connectMongo = require(conect.connectMongo);

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.set('views', 'src/views');

app.use('/assets', express.static(path.join(__dirname, 'public')));

// app.use('/api', )


news(app);

// app.use('/api/v1', apiNews);
app.use('/api', jsonParser);

app.use('/api', apiRoutes);

app.get('/airbnb', function(req,res){
  connectMongo('listingsAndReviews').then(function(collection){
    collection.find(function(data){
      res.send(data);
    });
  }).catch(function(err){
    res.send('Error', err);
  });
}); 

app.listen(port, () => {
  console.log('App is running in port ' + port);
})


