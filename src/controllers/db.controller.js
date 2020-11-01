/*

DB Controller
  /all => Noticia.getAll 

News controller

  db('noticias').getAll
    getById
    crear
    actualizar


Usuarios controller

  db('usuarios').find
    getById
    crear
    actualizar


Modelo 
  DB
  Noticia
    .getAll
    .getId


Middleware
  req.body, req.params, req.query....
  req.database.find('noticias')


MVC
M - DB
C - M-tx-V
V- {}
*/
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const url = process.env.DB_HOST;

function connectMongo(collectionName){

  return new Promise(function(resolve, reject){
    MongoClient.connect(url, {
      useUnifiedTopology: true
    }, function(err, client){
      if(err==null){
        const db = client.db();
        const collection = db.collection(collectionName);
        resolve({
          find: function(cbk){
            collection.find().limit(10).toArray((err, data)=>{
              if(err) console.log("Error ", err);
              cbk(data);
              client.close();

            })

          }
        });
        
      }else{
        reject(err);
      }
    });
  })
  

  
}


module.exports = connectMongo;
