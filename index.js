const mongoose = require('mongoose');
const categories = require('./routes/categories');
const products = require('./routes/products');
const fileupload = require('./routes/fileupload');
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const path = require('path');

mongoose.connect('mongodb://localhost/onlineshop', {useNewUrlParser:true})
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err))

app.use(express.json());
app.use(bodyParser.urlencoded({ 
  extended: true 
}));
app.use(express.static(path.join(__dirname, 'uploads')));

app.use('/api/categories', categories);
app.use('/api/products', products);
app.use('/api/fileupload', fileupload);

const port = process.env.PORT||3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));