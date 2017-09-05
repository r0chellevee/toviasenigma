const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
const app = express();


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/src/dist')));

require('./api')(app, express);

app.listen(3000, function(err) {
  if (err) {
    return console.error(err);
  }

  console.log('Listening at http://localhost:3000');
});



module.exports = app;