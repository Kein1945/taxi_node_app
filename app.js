const port = process.env.PORT || 3001;


const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json())

require('./routes')(app);

(function listen () {
  if (app.get('env') === 'test') return;
  app.listen(port);
  console.log('Express app started on port ' + port);
})()

module.exports = {
  app,
};
