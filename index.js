
const express = require('express')
const mongoose = require('mongoose');
const homeRoute = require('./routes/home');
const bodyParser = require('body-parser');
const app = express()
const port = 3000

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())



main().catch(err => console.log(err));
//mongodb://127.0.0.1:27017/test
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/footballcrud');

  console.log("new data base inserted");

}

app.use('/', homeRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})