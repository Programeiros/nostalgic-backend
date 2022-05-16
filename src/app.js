require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000;
const GameController = require("./controller/gameController");
const game = new GameController(app, "/api/games");
const db = require('./queries');
const { getgames } = require("./utils/gameUtils");

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({info:'Aplicação funcionando!'});
});


app.get('/games', db.getGames)
app.get('/games/:id', db.getGamesById)
app.post('/games', db.newGame)
app.put('/games/:id', db.updateGame)
app.delete('/games/:id', db.deleteGame)

game.start();

app.listen(port, () => {
  console.log(`Nostalgic API is Running on port: ${port}`);
});
