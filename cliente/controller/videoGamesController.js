var angular = require('angular');
var moment = require('moment');

angular.module('mean')
.service('videoGameService',['$http',function($http){

    this.getToken = function (d) {
      return $http.post(api+'/get-token',d);
    }


    this.getGames = function(d) {
      let request = {
        url: api + '/video-games',
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + d
        }
      }
      return $http(request)
    }

    this.getAll = function () {
      return $http.get(url_base+'/apiGames/get-games')
    }

    this.saveGame = function (d) {
      return $http.post(url_base + '/apiGames/save',d)
    }

    this.filterPlays = function () {
      return $http.get(url_base + '/apiGames/get-games-filter')
    }
}])
.controller('videoGameCtrl',['$scope','videoGameService',function($scope,videoGameService){

    $scope.tokenOk = false;
    $scope.error = false;

    $scope.init = function () {
      $scope.all()
    }

    $scope.all = function () {
      videoGameService.getAll()
      .then((result)=>{
        if (result.data.status == 200) {
          let data = result.data.data;
          data.length >= 1 ? $scope.gamesData  = data : false;
        }
      })
    }

    $scope.GenerarToken = function(){
      let data = {name:$scope.nombreToken}
      videoGameService.getToken(data)
      .then((result)=>{
        if (result.status == 200) {
          let token = result.data.token;
          $scope.tokenOk = true
          videoGameService.getGames(token)
          .then((result)=>{
            videoGameService.saveGame(result.data)
            .then((result)=>{
              // console.log(result);
              $scope.all();
            })
          })
        }else {
          $scope.error = true;
        }
      })
    }

    $scope.hideO = function () {
      $scope.tokenOk = false;
    }

    $scope.hideE = function () {
      $scope.error = false;
    }

    $scope.verGame=function(d){
		$('#gameModal').modal('show');
		$scope.gameItem=d;
	}

  $scope.filterGames =function () {
    videoGameService.filterPlays()
    .then((result)=>{
      console.log(result.data);
      let g = result.data
      for (var i = 0; i < g.length; i++) {
        g[i]
      }
    })
  }

}]);
