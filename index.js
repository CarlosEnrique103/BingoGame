const express = require('express');
const path = require('path')
const app = express();

app.use(function (req, res, next) {
    console.log(req.method, req.path);
    next();
});


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set(express.static('public'));

// LOGIC

let numbers = []
let length = 75;

for (let i = 1; i <= length; i++) {
    numbers.push(i);
}


// API

const generateNumberRandom = (length) => {
    return numberRandom = Math.floor(Math.random() * length) + 1;
}

app.get('/api/bingo/number', function (req, res) { 
    let numberRandom = generateNumberRandom(length);
    numbers = numbers.filter(n =>  n !== numberRandom );
    --length;
    res.send({number: numberRandom});
});


app.get('/api/bingo/primer', function (req, res) {

    let numberRandom = Math.floor(Math.random() * lengthBingo) + 1;
    res.send({number: numberRandom});
});


// GAME 

app.get('/game', function(req, res) {
  res.sendFile(path.join(__dirname, 'static/index.html'));
});

// Application

app.use('/', (req, res) => {
    return res.render('index');
})

app.listen(3000, function () {
    console.log("Listening on port 3000. Go to http://localhost:3000");
});