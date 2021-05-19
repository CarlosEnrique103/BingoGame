const express = require('express');
const path = require('path')

const app = express();

app.use(function (req, res, next) {
    console.log(req.method, req.path);
    next();
});


// API

let numbers = []
const typeBingo = 'EE.UU';
const lengthBingo = typeBingo== 'EE.UU'?  75 :  90;


for (let i = 0; i < lengthBingo; i++) {
    numbers.push(i);
}

app.get('/api/bingo/number', function (req, res) {    
    res.send({"number": numbers[8]});
});



// GAME 

app.get('/game', function(req, res) {
  res.sendFile(path.join(__dirname, 'static/index.html'));
});


app.listen(3000, function () {
    console.log("Listening on port 3000. Go to http://localhost:3000");
});