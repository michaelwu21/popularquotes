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
			  getPost(50);
			  $("#nav_login").hide();
			  $("#nav_me").show();
			  $("#nav_signout").show();
			  $("#nav_post").show();
			  var current_user = user.email;
			  var atposition = current_user.indexOf("@");
			  var current_username = current_user.slice(0, atposition);
			  $("#nav_me").html(current_username);
			  $("#nav_me").addClass("me");
			  login_close();
			  loggedin();

		  } else {
			  $("#nav_me").hide();
			  $("#nav_signout").hide();
			  $("#nav_login").show();
			  $("#nav_post").hide();
			  loggedout();
			  nav_home();
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
		nav_home();
	});
	$("#nav_signout").click(function () {
		firebase_signout();
	})
	$("#nav_post").click(function () {
		nav_post();
	})
	
	$("#remember_acc2").click(function() {
		$("#remember_acc3").slideToggle();
	});
	
	$("#sign_in").click(function () {
		checkuser();
	});
	//submit on enter key as well
	$("#login").keypress(function(e) {
    if(e.which == 13) {
        checkuser();
    }
	});
	$("#sign_up").click(function () {
		createuser();
	});
	
	$("#post_author").focus(function () {
		$(this).css("border-color", "orange");
	});
	$("#post_author").blur(function () {
		$(this).css("border-color", "yellow");
	});
	$("#post_quote").focus(function () {
		$(this).css("border-color", "orange");
	});
	$("#post_quote").blur(function () {
		$(this).css("border-color", "yellow");
	});
	$("#post_clear").click(function () {
		post_clear();
	});
	$("#entire_forget").click(function () {
		Cookies.remove('c1');
		$("#entire_forget").hide();
		$("#entire_remember").show();
	});
	$("#post").click(function () {
		createnewpost();
	});
});