const express = require('express');
const app = express();
const port = 3000;
const NesController = require('./NES/nes.controller');
const NES = new NesController(app, port);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/api', (req, res) => {
  res.send('Aplicação funcionando!');
});

NES.start();

app.listen(port, () => {
  console.log(`Nostalgic API is Running on port: ${port}`);
});

