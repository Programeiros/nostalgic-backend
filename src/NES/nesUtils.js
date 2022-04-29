const sequence = {
  _id: 1,
  get id() {
    return this._id++;
  },
};

const nesgames = {};

function getNesgames() {
  try {
    return Object.values(nesgames);
  } catch (error) {
    return { "error": error.message, "stack": error.stack };
  }
}

function getNesgameByid(id) {
  try {
    return nesgames[id] || {};
  } catch (error) {
    return { "error": error.message, "stack": error.stack };
  }
}

function setNesGame(nesgame) {
  if (!nesgame.id) nesgame.id = sequence.id;
  nesgames[nesgame.id] = nesgame;
  return nesgame;
}

function deleteNesGame(id) {
  const nesgame = nesgames[id];
  delete nesgames[id];
  return nesgame
}

module.exports = {
  setNesGame,
  getNesgameByid,
  getNesgames,
  deleteNesGame
};
