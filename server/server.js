const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const PORT = 5000;
const app = express();

const apiRouter = require('./routes/api');

app.use(express.json());


mongoose.connect('mongodb+srv://ak25117:AE1sg8yVMdwQYooA@cluster0.28v8jbi.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('✅ Connected to MongoDB Atlas');
});


app.use(express.urlencoded());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.resolve(__dirname, '../public')));
app.use(express.static(path.resolve(__dirname, '../client')));
// Awww thank you <3 <3 
// You're welcome :)

/**
 * define route handlers
 */
app.use('/api', apiRouter);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// unknown route ****Since we are using react router, 404 error will be handled on the front end side****
// app.use((req, res) => res.status(404).send('Unknown page, please try again.'));
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

//global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error' +err,
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;