const utils = require('./nesUtils');

class NesController {
  constructor(app, port) {
    this.app = app;
    this.port = port;
    this.route = '/api/NES';
  };

  start() {
    this.get();
    this.post();
    this.put();
    this.delete();
  };

  get() {
    this.app.get(this.route, (req, res) => {
      res.send(utils.getNesgames())
    });

    this.app.get(this.route + '/:id?', (req, res) => {
      res.send(utils.getNesgameByid(req.params.id));
    });
  };

  post() {
    this.app.post(this.route, (req, res) => {
      try {
        const nesgame = utils.setNesGame({
          name: req.body.name,
          description: req.body.description,
        });

        res.send(nesgame);
      } catch (error) {
        res.send({
          "error": error.message,
          "stack": error.stack
        });
      }
    });
  };

  put() {
    this.app.put(this.route + '/:id?', (req, res) => {
      try {
        const nesgame = utils.setNesGame({
          id: req.params.id,
          name: req.body.name,
          description: req.body.description,
        });

        res.send(nesgame);
      } catch (error) {
        res.send({
          "error": error.message,
          "stack": error.stack
        })
      }
    });
  };

  delete() {
    this.app.delete(this.route + '/:id?', (req, res) => {
      try {
        const nesgame = utils.deleteNesGame(req.params.id);
        res.send(nesgame);
      } catch (error) {
        res.send({
          "error": error.message,
          "stack": error.stack
        });
      };
    });
  }
}

module.exports = NesController;
