const utils = require("../utils/gameUtils");

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

    this.app.get(this.route + "/:id?", (req, res) => {
      res.send(utils.getgameByid(req.params.id));
    });
  }

  post() {
    this.app.post(this.route, (req, res) => {
      try {
        this.verify_string(req.body.name, "name");
        this.verify_string(req.body.description, "description", 500);
        this.verify_string(req.body.developer, "developer", 50);
        this.verify_string(req.body.launchdate, "launchdate");
        this.verify_string(req.body.platforms, "platforms", 50);
        this.verify_string(req.body.genre, "genre", 50);
        this.verify_string(req.body.mode, "mode", 100);

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
    this.app.put(this.route + "/:id?", (req, res) => {
      try {
        this.verify_string(req.body.name, "name");
        this.verify_string(req.body.description, "description", 500);
        this.verify_string(req.body.developer, "developer", 50);
        this.verify_string(req.body.launchdate, "launchdate");
        this.verify_string(req.body.platforms, "platforms", 50);
        this.verify_string(req.body.genre, "genre", 50);
        this.verify_string(req.body.mode, "mode", 100);

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
    this.app.delete(this.route + "/:id?", (req, res) => {
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

  verify_string(string, string_name, max_length = 80) {
    let e;

    if (!string || string == "") {
      console.log(string);
      e = new Error(`Campo: ${string_name} é  obrigatório!`);
      throw e;
    }

    if (typeof string !== "string") {
      e = new Error(`Campo : ${string_name} precisa ser uma string`);
      throw e;
    }

    if (string.length > max_length) {
      e = new Error(
        `O Campo: ${string_name} ultrapassou os ${max_length} caracteres!`,
      );
      throw e;
    }
  }
}

module.exports = GameController;
