require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./src/config/db");
const routes = require("./src/routes");

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);


module.exports = app;