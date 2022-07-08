const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index');
});

app.listen(8080, function () {
    console.log('Server is running on port 8080 ');
});
