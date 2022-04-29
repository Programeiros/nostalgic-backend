const express = require('express');
const app = express();
const port = 3000;
const GameController = require('./game/gameController');
const NES = new GameController(app, port, '/api/NES');
const SNES = new GameController(app, port, '/api/SNES');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/api', (req, res) => {
  res.send('Aplicação funcionando!');
});

NES.start();
SNES.start();

app.listen(port, () => {
  console.log(`Nostalgic API is Running on port: ${port}`);
});

