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
  game.id = newdata.id;
  game.name = newdata.name;
  game.description = newdata.description;
  game.developer = newdata.developer;
  game.genre = newdata.genre;
  game.launchdate = newdata.launchdate;
  game.mode = newdata.mode;
  game.image = newdata.image;
  game.platforms = newdata.platforms;

  games[id] = game;

  return games[id];
}

function deleteGame(id) {
  const game = games[id];
  delete games[id];
  return game;
}

module.exports = {
  setGame,
  getgameByid,
  getgames,
  updateGame,
  deleteGame,
};
