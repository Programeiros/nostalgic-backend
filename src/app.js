const express = require('express');
const app = express();
const port = 3000;
const GameController = require('./controller/gameController');
const game = new GameController(app, '/api/games');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api', (req, res) => {
  res.send('Aplicação funcionando!');
});

game.start();

app.listen(port, () => {
  console.log(`Nostalgic API is Running on port: ${port}`);
});
