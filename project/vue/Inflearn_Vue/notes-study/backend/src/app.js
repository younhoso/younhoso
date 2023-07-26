// libs
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import detectPort from 'detect-port';
import chalk from 'chalk';

// api
import auth from './api/auth.js';
import posts from './api/posts.js';
import docs from './utils/api-doc.js';

// utils
import { authenticateUser } from './utils/auth.js';
import 'regenerator-runtime'

require('dotenv').config();

const DB_NAME = process.env.DB_NAME;
const DB_PASS = process.env.DB_PASS;

// mongo db
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connect(
  `mongodb+srv://${DB_NAME}:${DB_PASS}@cluster0.3epib.mongodb.net/?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
);
mongoose.Promise = global.Promise;

// server setup
let port;
async function configServer() {
  port = 3000 || (await detectPort(3000));
};
configServer();

// express setup
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev')); // log request

// express routers
app.use('/', auth);
app.use('/posts', authenticateUser, posts);

// api docs
app.use('/api', docs);

// start
app.listen(port, () =>
  console.log(
    `${chalk.white
      .bgHex('#41b883')
      .bold(`VUE TIL SERVER IS RUNNING ON ${port}`)}`,
  ),
);
