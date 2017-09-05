const bodyParser = require('body-parser');
const path = require('path');
const webpack = require('webpack');
const express = require('express');
const config = require('./webpack.config');
const graphqlHTTP = require('express-graphql');
const app = express();
const compiler = webpack(config);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
}));
app.use(require('webpack-hot-middleware')(compiler));
app.use(express.static(path.join(__dirname, '/src/dist')));

require('./api')(app, express);

app.listen(3000, function(err) {
  if (err) {
    return console.error(err);
  }

  console.log('Listening at http://localhost:3000');
});


// app.use('/graphql', graphqlHTTP({
//   schema: GraphQLSchema,
//   graphiql: true
// }));

module.exports = app;