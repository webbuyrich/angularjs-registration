myApp.factory('Authentication', ['$rootScope', '$firebaseAuth', '$location', '$firebaseObject', 'FIREBASE_URL', 
	function($rootScope, $firebaseAuth, $location, $firebaseObject, FIREBASE_URL){

	var ref = new Firebase(FIREBASE_URL);
	var auth = $firebaseAuth(ref);

	//Check to see if user is authenticated
	auth.$onAuth(function(authUser){

		if (authUser){
			var userRef = new Firebase(FIREBASE_URL + 'users/' + authUser.uid);
			var userObj = $firebaseObject(userRef);
			console.log("Authenticated with uid:", authUser.uid);
			$rootScope.currentUser = userObj;

		} else{
			$rootScope.currentUser = '';
			
		}
	});

	return{

		// USER LOGIN 
		login: function(user){
			auth.$authWithPassword({
				email: user.email,
				password: user.password
			}).then(function(regUser){

				// redirect to success page
				$location.path('/success');


			}).catch(function(error){
				$rootScope.message = error.message;
				$location.path('/');
				
			});
			
		},

		// USER LOGOUT
		logout: function(){

			return auth.$unauth();

		},

		// REQUIRE AUTHENTICATION
		requireAuth: function(){
			return auth.$requireAuth();

		},

		//USER REGISTRATION
		register: function(user){
			//Create User
			auth.$createUser({
				email: user.email,
				password: user.password

			}).then(function(regUser){

				// Add data to database
				var regRef = new Firebase(FIREBASE_URL + 'users')
				.child(regUser.uid).set({
					date: Firebase.ServerValue.TIMESTAMP,
					regUser: regUser.uid,
					firstname: user.firstname,
					lastname: user.lastname,
					email: user.email
				});

				// Registration Success message
				$rootScope.message =  user.firstname + ' ' + user.lastname + ' you have successfully registered!';

			}).catch(function(error){
				$rootScope.message = error.message;
			});			
		}
	};

}]);










