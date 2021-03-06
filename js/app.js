var myApp = angular.module('myApp', 
	['ngRoute', 'firebase'])
	.constant('FIREBASE_URL', 'https://angjs-registration.firebaseio.com/');

	myApp.run(['$rootScope', '$location',
	  function($rootScope, $location) {
	    $rootScope.$on('$routeChangeError',
	      function(event, next, previous, error) {
	        if (error=='AUTH_REQUIRED') {
	          $rootScope.message = 'Sorry, you must log in to access that page';
	          $location.path('/login');
	        } // AUTH REQUIRED
	      }); //event info
	  }]); //run



myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/login', {
      templateUrl: 'views/login.html',
      controller: 'RegistrationController'
    }).
    when('/register', {
      templateUrl: 'views/register.html',
      controller: 'RegistrationController'
    }).
    when('/success', {
      templateUrl: 'views/success.html',
      controller: 'SuccessController',
      //Resolve url if accessed without authentication
      resolve: {
      	//Current Authentication
      	currentAuth: function(Authentication){
      		return Authentication.requireAuth();
      	}
      }
    }).
    otherwise({
      redirectTo: '/login'
    });
}]);



