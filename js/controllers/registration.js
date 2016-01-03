
// Registration Controller
myApp.controller('RegistrationController', 

	// Firebase Variables and Constants
	['$scope', 'Authentication', function($scope, Authentication){		

	// User Login
	$scope.login = function(){

		Authentication.login($scope.user);
	};

	//Register User
	$scope.register = function(){

		Authentication.register($scope.user);

	};

}]);