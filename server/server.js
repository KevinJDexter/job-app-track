const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const PORT = process.env.PORT || 5000;

const applicationRouter = require('./routes/applications.router');
const recruiterRouter = require('./routes/recruiter.router');
const contactRouter = require('./routes/contact.router');

app.use(express.static('server/public/dist'));
app.use(bodyParser.json());

app.use('/application', applicationRouter);
app.use('/recruiter', recruiterRouter);
app.use('/contact', contactRouter);

app.listen(PORT, () => {
  console.log('listening on port', PORT);
})