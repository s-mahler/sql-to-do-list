const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use( bodyParser.urlencoded({ extended: true }));
app.use(express.static('server/public'));

let listRouter = require('./routes/list_route');
app.use('/list', listRouter);

const PORT = 5000;
app.listen(PORT, () => {
    console.log('up and running on port', PORT);
});