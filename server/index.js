const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const helmet = require('helmet');
const passport = require("passport");
const router = require('./router')
const keys = require('./config/keys')


mongoose.connect(keys.MONGODB_URI, () => {
  console.log("connected to database");
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(passport.initialize());
router(app);

const server = app.listen(5000, () => {
  console.log("Node.js listening on port " + 5000);
})