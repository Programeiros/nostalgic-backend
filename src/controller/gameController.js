const fs = require("fs");
const path = require("path");
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
        this.set_values(req);
        this.verify_string(this.params.name, "name");
        this.verify_string(this.params.description, "description", 500);
        this.verify_string(this.params.developer, "developer", 50);
        this.verify_string(this.params.launchdate, "launchdate");
        this.verify_string(this.params.platforms, "platforms", 50);
        this.verify_string(this.params.genre, "genre", 50);
        this.verify_string(this.params.mode, "mode", 100);

        const nesgame = utils.setGame(this.params);

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
        this.set_values(req);
        this.verify_string(this.params.name, "name");
        this.verify_string(this.params.description, "description", 500);
        this.verify_string(this.params.developer, "developer", 50);
        this.verify_string(this.params.launchdate, "launchdate");
        this.verify_string(this.params.platforms, "platforms", 50);
        this.verify_string(this.params.genre, "genre", 50);
        this.verify_string(this.params.mode, "mode", 100);

        const nesgame = utils.updateGame(req.params.id, this.params);

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

  set_values(req) {
    this.params = {
      name: !(req.body.name !== "" || req.body.name === undefined)
        ? req.body.name
        : req.fields.name,
      description: !(
        req.body.description !== "" || req.body.description === undefined
      )
        ? req.body.description
        : req.fields.description,
      developer: !(
        req.body.developer !== "" || req.body.developer === undefined
      )
        ? req.body.developer
        : req.fields.developer,
      launchdate: !(
        req.body.launchdate !== "" || req.body.launchdate === undefined
      )
        ? req.body.launchdate
        : req.fields.launchdate,
      platforms: !(
        req.body.platforms !== "" || req.body.platforms === undefined
      )
        ? req.body.platforms
        : req.fields.platforms,
      genre: !(req.body.genre !== "" || req.body.genre === undefined)
        ? req.body.genre
        : req.fields.genre,
      mode: !(req.body.mode !== "" || req.body.mode === undefined)
        ? req.body.mode
        : req.fields.mode,
      image: this.upload_media(req.files),
    };
  }

  verify_string(string, string_name, max_length = 80) {
    let e;

    if (!string || string == "") {
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

  upload_media(files) {
    let dir = path.join(__dirname, "", "/uploads/");

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    let oldPath = files.image.path;
    let newPath = dir + "/" + files.image.name;
    let rawData = fs.readFileSync(oldPath);

    fs.writeFile(newPath, rawData, function (err) {
      if (err) throw new Error("Não foi possivel fazer o upload da imagem!");

      return "Imagem foi inserida com sucesso!";
    });

    return newPath;
  }
}

module.exports = GameController;
