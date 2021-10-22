
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const passport = require("passport");
const router = require('./router')
const keys = require('./config/keys')
const socketio = require('socket.io')

const Text = require('./services/groupText')
const schedule = require('node-schedule')

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

const io = socketio(server)
app.set('io', io)

io.on('connection', (socket) => {
  console.log('Socket connected')
})

//send group text daily at 11:00 p.m.
schedule.scheduleJob('0 0 23 ? * * *', () => {
  Text.groupText()
})
