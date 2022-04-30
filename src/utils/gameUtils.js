const sequence = {
  _id: 1,
  get id() {
    return this._id++;
  },
};

const games = {};

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

function setGame(game) {
  game.id = sequence.id;
  games[game.id] = game;
  return game;
}

function updateGame(id, newdata) {
  games[id] = newdata;

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
