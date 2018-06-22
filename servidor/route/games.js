const express = require('express');
const router = express.Router();
const gameCtrl = require('../controller/gameController');


router.route('/save').post(gameCtrl.saveGame)
router.route('/get-games').get(gameCtrl.getGames)
router.route('/get-games-filter').get(gameCtrl.getGamesFilter)



module.exports = router;
