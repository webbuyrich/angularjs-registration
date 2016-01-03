
// Registration Controller
myApp.controller('RegistrationController', 

	// Firebase Variables and Constants
	['$scope', '$firebaseAuth', 'FIREBASE_URL', function($scope, $firebaseAuth, FIREBASE_URL){

		var ref = new Firebase(FIREBASE_URL);
		var auth = $firebaseAuth(ref);

	// User Login
	$scope.login = function(){

		$scope.message = 'Welcome ' + $scope.user.email;
	};

	//Register User
	$scope.register = function(){

		//Create User
		auth.$createUser({
			email: $scope.user.email,
			password: $scope.user.password
		}).then(function(regUser){
			$scope.message =  $scope.user.firstname + ' ' + $scope.user.lastname + ' you have successfully registered!';

		}).catch(function(error){
			$scope.message = error.message;
		});

	};

}]);