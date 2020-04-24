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

// Connect to database
connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());

//Route files
const categories = require("./modules/categories/routes/categories");
const products = require("./modules/produts/routes/produts");
const users = require("./modules/users/routes/users");
const auth = require("./modules/users/routes/auth");

app.use(errorHandler);

// Dev tools / middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// File uploading
app.use(fileupload());

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 200
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Mount routers
app.use('/api/categories', categories);
app.use('/api/products', products);
app.use('/api/users', users);
app.use('/api/auth', auth);

const PORT = process.env.PORT || 3000;
const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
      .yellow.bold
  )
);