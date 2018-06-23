const GameModel = require('../model/Game');
const Promise = require('bluebird');

function saveGame(req,res) {
  let items = req.body;
  Promise.each(items,(i)=>{
    return new Promise((resolve, reject)=>{
      let play = {} ;
      play.idGame = i.console[0]._id + i.year;
      play.name = i.name;
      play.description = i.description;
      play.year = i.year;
      play.developer = i.developer;
      play.imagen = i.image;
      play.console = i.console;
      console.log(play);
      GameModel.saveGames(play)
      .then((result)=>{
        if (result.err == false) {
          resolve()
        }else {
          resolve()
        }
      })
    })
  }).then((result)=>{
    res.json({status:200})
  })
}

function getGames(req,res) {
  return new Promise(function(resolve, reject) {
    GameModel.get()
    .then((result)=>{
      if (result.err == false) {
        res.json({status:200,data:result.result})
      }else {
        res.json({status:500,err:result.error})
      }
    })
  })
}

function getGamesFilter(req,res) {
  return new Promise(function(resolve, reject) {
    GameModel.filter()
    .then((result)=>{
      if (result.err == false) {
        let data = result.data
        let game = []
        min = Math.min.apply(null, data.map(function(item) {
          return item.count;
        }))
        for (var i=0; i < data.length; i++) {
          if (data[i].count === min) {
            game.push(data[i]);
          }
        }
        res.json({status:200,data:game})
      }else {
        res.json({status:500})
      }
    })
  });
}


module.exports = {
  saveGame,
  getGames,
  getGamesFilter
};
