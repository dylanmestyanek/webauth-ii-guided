const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const KnexSessionStorage = require("connect-session-knex")(session);

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');
const knexConnection = require('../database/dbConfig');

const server = express();

const sessionConfig = {
  name: 'idiot',
  secret: process.env.COOKIE_SECRET || "unless you are me",
  cookie: {
    maxAge: 1000 * 60 * 60, // Valid for 1 hour (in milliseconds),
    secure: process.env.NODE_ENV === 'development' ? false : true, // Do we send cookie over HTTPS only?
    httpOnly: true, // Prevent client JS code from accessing the cookie  
  },
  resave: false, // Save sessions even when they haven't changed
  saveUninitialized: true,
  store: new KnexSessionStorage ({
    knex: knexConnection,
    clearInterval: 1000 * 60 * 10, // Delete expired sessions every 10 minutes
    tablename: 'user-sessions',
    sidfieldname: 'id',
    createtable: true,

  })
}

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.json({ api: 'up' });
});

module.exports = server;
