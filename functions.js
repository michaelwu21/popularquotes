function loaded () {
	if($(".pace-inactive").css('display') == 'none'){
		$("#website").show();
		var loaded = true;
		clearInterval(interval);
	}
}	
//cool functions
function fadeout (elem, speed) {
	$(elem).animate({opacity: '0'}, speed)
}	

//open login/signup
function login_close () {
	$("#login").hide("slide", { direction: "left" }, 400);
	$("#remember_acc3").hide();
}
function login_open () {
	$("#wrongpass").hide();
	$("#login").show("slide", { direction: "left" }, 400);
}
function loggedin () {
	$("#nav_loggedout").hide();
	$("#nav_loggedin").show( "bounce", 500).fadeOut(1500);
}
function loggedout () {
	$("#nav_loggedin").hide();
	$("#nav_loggedout").show( "bounce", 500).fadeOut(1500);
}
//nav functions
function nav_clear () {
	$("#entire_home").hide("slide", { direction: "left" }, 200);
	$("#entire_post").hide("slide", { direction: "left" }, 200);
	$("#entire_me").hide("slide", { direction: "left" }, 200);
	$("#entire_home").hide("slide", { direction: "left" }, 200);
}
function nav_home () {
	nav_clear ();
	$("#entire_home").show("slide", {direction: "left" }, 200);
}
function checkuser () {
	$("#loading").show();
	var username = $("#login_username").val();
	var password1 = $("#login_password").val();
	if($("#remember_acc").is(':checked')){
		var login_saveuser = true;
		console.log("saving username...");
	}else {
		var login_saveuser = false;
	}
	var username1 = username + "@popularquotes.com";
	firebase.auth().signInWithEmailAndPassword(username1, password1).then(function(result) {
		if (login_saveuser) {
			Cookies.set('c1', username, { expires: 500 });
		}
		$("#nav_me").html(username);
		$("#nav_me").addClass("me");
		$("#loading").hide();
	}, function(error) {
	$("#wrongpass").show();
		$("#loading").hide();
	})
}
function firebase_signout() {
	firebase.auth().signOut();
}