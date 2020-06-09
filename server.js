const express = require ('express');
const mongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

const db = require('./config/db');

const app = express();

const port = 8000;

app.use(bodyParser.urlencoded({extended: true}));

const client = new mongoClient(db.url, { useNewUrlParser: true })
client.connect(err => {
  if (err) return console.log(err)
  const db = client.db("databaseName")
  require('./apps/routes')(app, db);
  app.listen(port, () => {
    console.log("We are live on " + port);
  });
});

