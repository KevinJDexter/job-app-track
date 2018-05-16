const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const PORT = process.env.PORT || 5000;

const applicationRouter = require('./routes/applications.router');

app.use(express.static('server/public/dist'));
app.use(bodyParser.json());

app.use('/application', applicationRouter);

app.listen(PORT, () => {
  console.log('listening on port', PORT);
})