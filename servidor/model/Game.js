const mongoose = require('mongoose')

let gameSchema =  mongoose.Schema({
  idGame: {type:String, required:true},
  name:{type:String, required: true},
  description: String,
  year: String,
  developer:String,
  imagen:String,
  console: []
});
var Game = mongoose.model('Game',gameSchema);

  function saveGames(d) {
    return new Promise(function(resolve, reject) {
      let game = new Game(d)
      game.save((err,games)=>{
        if (!err) {
          resolve({err:false})
        }else {
          resolve({err:true, error:err})
        }
      })
    })
  }


  function get() {
    return new Promise(function(resolve, reject) {
      Game.find({},function(err,plays){
        if (!err) {
          resolve({err:false, result:plays})
        }else {
          resolve({err:true, error:err})
        }
      })
    })
  }

  function filter() {
    return new Promise(function(resolve, reject) {
      Game.aggregate([{$group:{_id:"$console",games:{$push:"$name"}}}],function(err,items){
        if (!err) {
          console.log(items);
          resolve(items)
        }else{
          resolve(err)
          console.log(err);
        }
      })
    });
  }


module.exports = {
  saveGames,
  get,
  filter
};
