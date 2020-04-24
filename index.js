const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");
const fileupload = require("express-fileupload");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/db");

// Load env vars
dotenv.config({ path: "./config/config.env"})
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