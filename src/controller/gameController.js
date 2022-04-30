const utils = require('../utils/gameUtils');

class GameController {
  constructor(app, route) {
    this.app = app;
    this.route = route;
  }

  start() {
    this.get();
    this.post();
    this.put();
    this.delete();
  }

  get() {
    this.app.get(this.route, (req, res) => {
      res.send(utils.getgames());
    });

    this.app.get(this.route + '/:id?', (req, res) => {
      res.send(utils.getgameByid(req.params.id));
    });
  }

  post() {
    this.app.post(this.route, (req, res) => {
      try {
        const nesgame = utils.setGame(req.body);

        res.send(nesgame);
      } catch (error) {
        res.send({
          error: error.message,
          stack: error.stack,
        });
      }
    });
  }

  put() {
    this.app.put(this.route + '/:id?', (req, res) => {
      try {
        const nesgame = utils.updateGame(req.params.id, req.body);

        res.send(nesgame);
      } catch (error) {
        res.send({
          error: error.message,
          stack: error.stack,
        });
      }
    });
  }

  delete() {
    this.app.delete(this.route + '/:id?', (req, res) => {
      try {
        const nesgame = utils.deleteGame(req.params.id);
        res.send(nesgame);
      } catch (error) {
        res.send({
          error: error.message,
          stack: error.stack,
        });
      }
    });
  }
}

module.exports = GameController;
