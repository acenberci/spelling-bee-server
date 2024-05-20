const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require('fs');
const englishDictionary = require("./dummyDictionary/dictionary.json");
const corsOptions = {
  origin: ['https://spelling-bee-client.vercel.app', 'http://localhost:3000'],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.post("/en", (req, res) => {
  var {value} = req.body
  value = value.toLocaleLowerCase("en");
  if(englishDictionary[value])res.json(true)
    else res.json(false)
})

app.post("/tr", (req, res) => {
  var {value} = req.body
  value = value.toLocaleLowerCase("tr");
  fs.readFile('./dummyDictionary/turkishDictionary.txt', 'utf8', (err, data) => {
    if (err) {
      console.error('Dosya okunurken bir hata oluştu:', err);
      return;
    }
    if (data.includes(value)) {
      res.json(true)
    } else {
      res.json(false)
    }
  });
})
app.get("/asd", (req, res) => {
  res.json("asd")
})


app.listen(3001, "localhost", () => {
    console.log("Server running on port 3001");
  });