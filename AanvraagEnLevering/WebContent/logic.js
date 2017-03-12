/**
 * Javascript file. Hier is de hele logika achter de view.
 */

angular.module("myApp", ['ngRoute'])
	.config(['$routeProvider', function($routeProvider){
		$routeProvider.when('/',{
			templateUrl: "formulier.html",
			controller: "myCtrl1 as ctrl"
		})
		.when('/overzicht', {
			templateUrl: "overzicht.html",
			controller: "myCtrl2 as ctrl"
			
		});
	}])
	.controller("myCtrl1", ["ItemService", "$route", function(ItemService, $route) {
		var self = this;
		self.aanvraag = "";
		self.levering = "";
		self.addTekstAanvraagEnLevering = function() {	
			var obj = {aanvraag: self.aanvraag, levering: self.levering};
			ItemService.addText(obj);
			self.test = obj;
			self.aanvraag = "";
			self.levering = "";
			$route.reload();
		}
		self.resetAanvraag = function() {
			self.aanvraag = "";
		}
		self.resetLevering = function() {
			self.levering = "";
		}
	}])
	.controller("myCtrl2", ["ItemService", function(ItemService) {
		var self = this;
		self.tekst = ItemService.getList();
	}])
	.factory("ItemService", [function() {
		var list = [];
		return {
			addText: function(item) {
				list.unshift(item);
			},
			getList: function() {
				return list;
			}
		};
	}]);