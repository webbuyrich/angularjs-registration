myApp.factory('Authentication', ['$rootScope', '$firebaseAuth', 'FIREBASE_URL', function($rootScope, $firebaseAuth, FIREBASE_URL){

	var ref = new Firebase(FIREBASE_URL);
	var auth = $firebaseAuth(ref);

	return{
		login: function(user){
			$rootScope.message =  'Welcome back '+ user.firstname + ' ' + user.lastname ;
		},

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










