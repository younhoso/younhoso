const express = require('express');

const app = express();

const users = ['Tom', 'Andy', 'Jessica', 'Paul']

app.get('/', (req, res) => {
  res.end('<h1>Welcome!</h1>');
});

app.get('/users', (req, res) => {
  res.end(`<h1>${users}</h1>`);
});

app.get('/users/:id', (req, res) => {
  const userName = users[req.params.id - 1];
  res.end(`<h1>${userName}</h1>`)
});

app.get('*', (req, res) => {
  res.end(`<h1>Page Not Available</h1>`)
});

app.listen(3000);