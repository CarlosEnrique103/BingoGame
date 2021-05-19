const express = require("express");
const path = require("path");
const app = express();

app.use(function (req, res, next) {
  console.log(req.method, req.path);
  next();
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.set(express.static("public"));

// LOGIC

let numbers = [];
let length = 75;

for (let i = 1; i <= length; i++) {
  numbers.push(i);
}

/* GENERATE PRIMER */

let dictionaryBingo = {
  B: { from: 1, to: 15 },
  I: { from: 16, to: 30 },
  N: { from: 31, to: 45 },
  G: { from: 46, to: 60 },
  O: { from: 61, to: 75 },
};

let bingo = {
  B: [],
  I: [],
  N: [],
  G: [],
  O: [],
};

// Genera un numero aleatorio desde  1 hasta la length

const generateNumberRandom = (length) => {
  return (numberRandom = Math.floor(Math.random() * length) + 1);
};

// Llenado de valores del bingo con sus numero respectivos

const valuesLetter = () => {
  for (let i in dictionaryBingo) {
    let obj = dictionaryBingo[i];
    let values = [];
    for (let i = obj.from; i <= obj.to; i++) {
      values.push(i);
    }
    bingo[i] = values;
  }
};

// Generar cartilla con 5 valores por cada letra

const generateValues = () => {
  valuesLetter();
  for (let letter in bingo){
    let newNumbers = [];
    while (newNumbers.length <= 5) {
      let value = bingo[letter][generateNumberRandom(14)];
      if(!newNumbers.includes(value)) {
        newNumbers.push(value);
      }
    }
    bingo[letter] = newNumbers.sort((a , b) => a - b );
  }
};

// API

app.get("/api/bingo/number", function (req, res) {
  let numberRandom = generateNumberRandom(length);
  numbers = numbers.filter((n) => n !== numberRandom);
  --length;
  res.send({ number: numberRandom });
});

app.get("/api/bingo/primer", function (req, res) {
  generateValues();
  res.send({ primer: bingo });
});

// GAME

app.get("/game", function (req, res) {
  res.sendFile(path.join(__dirname, "static/index.html"));
});

// Application

app.use("/", (req, res) => {
  return res.render("index");
});

app.listen(3000, function () {
  console.log("Listening on port 3000. Go to http://localhost:3000");
});
