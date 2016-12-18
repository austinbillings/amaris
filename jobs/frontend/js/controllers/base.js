angular.module('<%= name %>')
.controller('base', ['$scope', '$rootScope', '$http', '$log', '$sce' 'NorthEast', 'RingoService', function ($scope, $rootScope, $http, $log, $sce, NorthEast, RingoService) {
  $scope.ne = NorthEast;
  $scope.ui = {
    viewPrefix: ''
  };
  $scope.fa = function (icon) {
    return 'fa fa-' + icon;
  }
  $scope.template = function (name) {
    return $scope.ui.viewPrefix + '/html/templates/' + name + '.html';
  }
  $scope.view = function (name) {
    return $scope.ui.viewPrefix + '/html/views/' + name + '.html';
  }
  $scope.partial = function (name) {
    return $scope.ui.viewPrefix + '/html/partials/' + name + '.html';
  }
  $scope.slug = function (input) {
    return input.toLowerCase().replace(' ','-');
  }
  $scope.trust = function (html) {
    return $sce.trustAsHtml(html);
  }
  $scope.resource = function (url) {
    return $sce.trustAsResourceUrl(url);
  }
  $scope.bgi = function (image) {
    return 'url("' + image + '")';
  }
	$scope.useBgi = function (image) {
		return !image ? {} : {backgroundImage: $scope.bgi(image)};
	}
}]);
