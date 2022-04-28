class NesController {
   constructor(app, port){
     this.app = app
     this.port = port
   }

   get(){
    this.app.get('/api/NES', (req, res) => {
      res.send('Sem jogos de NES!');
    })
   }
}

module.exports = NesController;

