function loaded () {
	if($(".pace-inactive").css('display') == 'none'){
		$("#website").show('scale', 200);
		var loaded = true;
		nav_home();
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
	setTimeout(function() {
	login_clear()
	},400);
}
function login_clear () {
	$("#login_username").val("");
	$("#login_password").val("");
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
	$("#entire_home").hide("slide", { direction: "right" }, 200);
	$("#entire_post").hide("slide", { direction: "right" }, 200);
	$("#entire_me").hide("slide", { direction: "right" }, 200);
	$("#entire_home").hide("slide", { direction: "right" }, 200);
}
function nav_home () {
	nav_clear ();
	$("#entire_home").show("slide", {direction: "left" }, 200);
}
function nav_post () {
	if(checkifhidden("#entire_post")) {
	nav_clear();
	$("#entire_post").show("slide", {direction: "left" }, 200);
	} else {
	$("#entire_post").animate({ scrollTop: 0 }, "fast");
	return false;
	}
}
function checkuser () {
	$("#wrongpass").hide();
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
			Cookies.remove('c1');
			Cookies.set('c1', username, { expires: 500 });
			console.log("saved!");
		}
		$("#loading").hide();
	}, function(error) {
	$("#wrongpass").show();
		$("#loading").hide();
		return false;
	})
}
function firebase_signout() {
	firebase.auth().signOut();
}
function checkifhidden (elem) {
	if($(elem).is(":visible")){
		return false
	} else {
		return true;
	}
}
	