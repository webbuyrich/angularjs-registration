myApp.controller('RegistrationController', ['$scope', function($scope){

	$scope.login = function(){

		$scope.message = 'Welcome ' + $scope.user.email;
	};

	$scope.register = function(){

		$scope.message =  $scope.user.firstname + ' ' + $scope.user.lastname + ' you have successfully registered! Use your email and password to login.';
	};

}]);