(function() {
	// Initialize Firebase
	  var config = {
		apiKey: "AIzaSyCTdViahea1ZiWKJmsz7UT8EsThQq9-TPs",
		authDomain: "popularquotes-c80ee.firebaseapp.com",
		databaseURL: "https://popularquotes-c80ee.firebaseio.com",
		storageBucket: "popularquotes-c80ee.appspot.com",
		messagingSenderId: "271170206317"
	  };
	  firebase.initializeApp(config);
	  var database = firebase.database();
	  firebase.auth().onAuthStateChanged(function(user) {
		  if (user) {
			  $("#nav_login").hide();
			  $("#nav_me").show();
			  $("#nav_signout").show();
			  login_close();
			  loggedin();

		  } else {
			  loggedout();
			  $("#nav_me").hide();
			  $("#nav_signout").hide();
			  $("#nav_login").show();
		  }
			  
	  })
}());
//make website visible after loading
var interval = setInterval(loaded, 50);

$(function() {
	

//sign in
	
	//close login
	$(".close").click(function() {
		login_close();
	});
	//open login
	$("#nav_login").click(function() {
		login_open();
	})	
	//navigate functions
	$("#nav_home").click(function() {
		console.log("Navigated Home!");
		nav_home();
	});
	$("#nav_signout").click(function () {
		firebase_signout();
	})
	
	$("#remember_acc2").click(function() {
		$("#remember_acc3").slideToggle();
	});
	
	$("#sign_in").click(function () {
		checkuser();
	});
	$("#sign_up").click(function () {
		firebasesignup();
	});
	
});