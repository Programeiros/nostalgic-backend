const fs = require("fs");

const sequence = {
  _id: 1,
  get id() {
    return this._id++;
  },
};

const games = {};
const game = {
  id: 0,
  name: "",
  description: "",
  developer: "",
  launchdate: "",
  platforms: "",
  genre: "",
  mode: "",
  image: "",
};

function getgames() {
  try {
    return Object.values(games);
  } catch (error) {
    return {
      error: error.message,
      stack: error.stack,
    };
  }
}

function getgameByid(id) {
  try {
    return games[id] || {};
  } catch (error) {
    return {
      error: error.message,
      stack: error.stack,
    };
  }
}

function setGame(value) {
  value.id = sequence.id;

  game.id = value.id;
  game.name = value.name;
  game.description = value.description;
  game.developer = value.developer;
  game.genre = value.genre;
  game.launchdate = value.launchdate;
  game.mode = value.mode;
  game.image = value.image;
  game.platforms = value.platforms;

  games[value.id] = game;

  return games[game.id];
}

function updateGame(id, newdata) {
  delete_file(games[id].image);

  games[id].id = id;
  games[id].name = newdata.name;
  games[id].description = newdata.description;
  games[id].developer = newdata.developer;
  games[id].genre = newdata.genre;
  games[id].launchdate = newdata.launchdate;
  games[id].mode = newdata.mode;
  games[id].image = newdata.image;
  games[id].platforms = newdata.platforms;

  return games[id];
}

function deleteGame(id) {
  const game = games[id];
  delete_file(game.image);
  delete games[id];
  return game;
}

function delete_file(path) {
  fs.unlink(path, (err) => {
    if (err) return console.log(err);
    console.log("file deleted successfully");
  });
}

module.exports = {
  setGame,
  getgameByid,
  getgames,
  updateGame,
  deleteGame,
};
