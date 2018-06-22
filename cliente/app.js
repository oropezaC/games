var angular = require('angular');

url_base = 'http://localhost:3020';
api = 'http://204.232.175.226:3000';

angular.module('mean', [])
.config(['$interpolateProvider', function($interpolateProvider){
	$interpolateProvider.startSymbol('{[');
	$interpolateProvider.endSymbol(']}');
}]);
var url = url_base;
require('./controller/videoGamesController')
