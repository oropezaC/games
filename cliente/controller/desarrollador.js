var angular = require('angular');
var moment = require('moment');
require('../service/save')
angular.module('agenda')
.controller('developerCtrl', ['$scope','save', function ($scope,save) {

	$scope.devs=function(){
		save.getdev()
		.then(function(result){
			var d = result.data;
			d.forEach(function(d){
				var tool = d.skill;
				var fecha_r = moment(d.fecha_registro);
				d.fecha_reg=(fecha_r.format('DD-MM-YYYY'))
				d.toll = tool.toString();
			})
			$scope.developers=d;
			console.log(d);
		})
	}

	$scope.save=function(d){
		$scope.btnSave=true;
		if (d == undefined) {
			$scope.msgErr = true;
		}else if (d.nombre==undefined||d.paterno==undefined||d.materno==undefined||d.calle==undefined||d.colonia==undefined||d.delegacion==undefined||d.cp==undefined||d.celular==undefined||d.correo==undefined||d.skill==undefined) {
			$scope.msgErr = true;
		}else{
			save.saveDev(d)
			.then(function(result){
				console.log(result.data.err);
				if (result.data.err == false) {
					$scope.btnSave=false;
					$('.ui.modal')
					.modal('show');
				}else{
					console.log("Error al cargar");
				}
			});	
			
		}
	}



	$scope.nuevoReg=function(){
		location.reload();
	}


	$scope.cancel=function(){
		document.location.href= '/desarrolladores';
	}


	$scope.addDev=function(){
		document.location.href= '/registro';
	}


	$scope.verDev=function(d){
		$('#hello').modal('show');
		$scope.devUnit=d;
		$scope.devDir=d.direccion;
		$scope.devSkill=d.skill;
	}


	$scope.Update=function(d,w){
		d.direccion =w;
		save.updateDev(d)
		.then(function(result){
			if (result.data.ok==1) {
				$('#hello').modal('hide').modal('hide dimmer');
				notificationUpdate()
			}
		})
	}

	$scope.cancelUpdate=function(){
		$('#hello').modal('hide').modal('hide dimmer');
	}

	$scope.Remove=function(d){
		save.removeDev(d)
		.then(function(result){
			if (result.data.ok==1) {
				notificationRemove()
				$scope.developers.splice($scope.developers.indexOf(d), 1);
			}
		})
	}


// Funciones
	function notificationUpdate(){
		// var vibrate = Notification.vibrate;
		var options = {
			icon: url_base+'/img/notification.png',
			dir: 'ltr'
		}
		if(Notification.permission == 'granted') {
			var notification = new Notification("Registro Actualizado", options);
			setTimeout(notification.close.bind(notification), 1000);
		} else {
			Notification.requestPermission();
		}		
	}

	function notificationRemove(){
		var options = {
			icon: url_base+'/img/notification.png',
			dir: 'ltr'
		}
		if(Notification.permission == 'granted') {
			var notification = new Notification("Registro Eliminado", options);
			setTimeout(notification.close.bind(notification), 1000);
		} else {
			Notification.requestPermission();
		}		
	}




}]);
