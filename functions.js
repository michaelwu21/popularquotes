function loaded () {
	$("#nav_me").hide();
	if($(".pace-inactive").css('display') == 'none'){
		$("#website").show('scale', 200);
		var loaded = true;
		nav_homefirst();
		clearInterval(interval);
		console.log("page loaded")
		var accheight = $("#nav").innerHeight() + 9;
		var accwidth = $("#nav_me").width();
		$(".dropdown").css("margin-top", accheight);
		$(".dropdown").css("width", accwidth);
		removejscssfile("dataurl.css", "css");
		getPost(50);
	}
}	
//remove js and css of load screen to remove loading bug
function removejscssfile(filename, filetype){
    var targetelement=(filetype=="js")? "script" : (filetype=="css")? "link" : "none" //determine element type to create nodelist from
    var targetattr=(filetype=="js")? "src" : (filetype=="css")? "href" : "none" //determine corresponding attribute to test for
    var allsuspects=document.getElementsByTagName(targetelement)
    for (var i=allsuspects.length; i>=0; i--){ //search backwards within nodelist for matching elements to remove
    if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(filename)!=-1)
        allsuspects[i].parentNode.removeChild(allsuspects[i]) //remove element by calling parentNode.removeChild()
    }
}

function getPost (number) {
	var previous = 'none';
	var current_date = + new Date();
	var oneweek = current_date - 604800000;
	var database = firebase.database().ref().child("posts").limitToLast(number);
	database.on("child_added", snap => {
		var date = snap.child("date").val();
		if (date > oneweek) {
			var likes = snap.child("likes").val();
			var poster1 = snap.child("poster").val();
			var author = snap.child("author").val();
			var quote = snap.child("quote").val();
			showPost(likes, poster1, author, quote, date, previous);
			previous = date;
		} else {
			firebase.database().ref("posts/" + date).remove();
		}

	});
	enablebutton("#refresh");
}
function showPost (likes, poster, author, quote, date, previous) {
	if (previous === 'none') {
		$("<span class='post'><div class='poster1'></div><div class='likes'></div><br><div class='author'></div><br><div class='quote'></div><br><div class='date'></div></span><br><br>").appendTo("#entire_home");
		$('.post').first().attr('id', date);
		console.log('firstpostloaded');
		var postid = '#' + date;
		$(postid + ' .poster1').html(poster);
		$(postid + ' .likes').html('Likes:' + likes);
		$(postid + ' .author').html(author);
		$(postid + ' .quote').html(quote);
		$(postid + ' .date').html(converttime(date));
	} else {
		var previous1 = '#' + previous
		$("<span class='post'><div class='poster1'></div><div class='likes'></div><br><div class='author'></div><br><div class='quote'></div><br><div class='date'></div></span><br><br>").insertBefore(previous1);			
		$('.post').first().attr('id', date);
		console.log('postloaded');
		var postid = '#' + date;
		$(postid + ' .poster1').html(poster);
		$(postid + ' .likes').html('Likes: ' + likes);
		$(postid + ' .author').html(author);
		$(postid + ' .quote').html(quote);
		$(postid + ' .date').html(converttime(date));
	}
	
}
function newPost (auth, quote1) {
	var database = firebase.database();
	var current_username = $("#nav_me1").html();
	var date = + new Date();
	database.ref('posts/' + date).set({
		poster: current_username,
		date: date,
		author: auth,
		quote: quote1,
		likes: 0
	});
	}
function createnewpost () {
	$("#post_error").hide();
	var quote = $("#post_quote").val();
	var author = $("#post_author").val();
	if (author === '') {
		author = "Anonymous";
	}
	if (quote != "") {
		newPost(author, quote);
	} else {
		$("#post_error").show("shake", 300);
	}
}
function refreshposts (amount) {
	disablebutton("#refresh");
	$("#loading2").show();
	$(".post").remove();
	$("#entire_home").find("br").remove();
	getPost(amount);
}
	
function converttime (time) {
	var d = new Date(time);
	date = d.toLocaleString();
	var date2 = date.slice(0, -6);
	var dateindex = date.indexOf(':') + 6;
	var date3 = date.slice(dateindex);
	var date4 = date2 + date3
	return date4;
}
function disablebutton (id) {
	$(id).prop("disabled",true);
}
function enablebutton (id) {
	$(id).prop("disabled",false);
}
//cool functions
function fadeout (elem, speed) {
	$(elem).animate({opacity: '0'}, speed)
}	

//open login/signup
function login_close () {
	$("#loading").hide();
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
	document.title="Popular Quotes- Login"
	$("#loading").hide();
	var rememberedusername = Cookies.get('c1');
	if (typeof rememberedusername === 'undefined') {
		$("#entire_forget").hide();
		$("#entire_remember").show();
	} else {
		console.log(rememberedusername);
		$("#login_username").val(rememberedusername);
		$("#entire_forget").show();
		$("#entire_remember").hide();
	}
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
	$("#home").hide("slide", { direction: "right" }, 200);
	$("#entire_home").hide("slide", { direction: "right" }, 200);
	$("#entire_post").hide("slide", { direction: "right" }, 200);
	$("#entire_me").hide("slide", { direction: "right" }, 200);
	$("#entire_home").hide("slide", { direction: "right" }, 200);
	$("#entire_settings").hide("slide", { direction: "right" }, 200);
}
function nav_home () {
	document.title="QuoteSharer - Home"
	if(checkifhidden("#entire_home")) {
	nav_clear ();
	$("#home").show("slide", { direction: "left" }, 200);
	$("#entire_home").show("slide", { direction: "left" }, 200);
	} else {
	$("html, body").animate({ scrollTop: 0 }, "fast");
	return false;
	}
}
function nav_homefirst () {
	document.title="QuoteSharer - Home"
	var user = firebase.auth().currentUser;

	if (user) {
		
		$("#nav_login").hide();
		$("#nav_me").show();
		$("#nav_signout").show();
		$("#nav_post").show();
		var current_user = user.email;
		var atposition = current_user.indexOf("@");
		var current_username = current_user.slice(0, atposition);
		$("#nav_me1").html(current_username);
		$("#nav_me1").addClass("me");
		login_close();
	} else {
		  $("#nav_me").hide();
		  $("#nav_signout").hide();
		  $("#nav_login").show();
		  $("#nav_post").hide();
		  $("#nav_loggedout").hide();
	}
	nav_clear ();
	$("#home").show("slide", { direction: "left" }, 200);
	$("#entire_home").show("slide", { direction: "left" }, 200);
}
function nav_post () {
	document.title="QuoteSharer - Post"
	if(checkifhidden("#entire_post")) {
	nav_clear();
	$("#post_error").hide();
	$("#entire_post").show("slide", {direction: "left" }, 200);
	}
}
function nav_settings () {
	document.title="QuoteSharer - Settings"
	if(checkifhidden("#entire_settings")) {
		nav_clear();
		$("#entire_settings").show("slide", { direction: "left" }, 200);
	}
}
function checkuser () {
	disablebutton(sign_in);
	disablebutton(sign_up);
	$("#wrongpass3").hide();
	$("#wrongpass1").hide();
	$("#wrongpass2").hide();
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
	var username1 = username.toLowerCase() + "@popularquotes.com";
	firebase.auth().signInWithEmailAndPassword(username1, password1).then(function(result) {
		if (login_saveuser) {
			Cookies.set('c1', username, { expires: 500 });
			console.log(Cookies.get('c1') + 'saved!');
		}
		$("#loading").hide();
	}, function(error) {
		$("#wrongpass").show();
		$("#loading").hide();
		return;
	});
	enablebutton(sign_in);
	enablebutton(sign_up);
}
function createuser () {
	disablebutton("#sign_in");
	disablebutton("#sign_up");
	$("#wrongpass3").hide();
	$("#wrongpass1").hide();
	$("#wrongpass2").hide();	
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
	if (username != "" && password1.length > 5) {
		
	var username1 = username.toLowerCase() + "@popularquotes.com";
	firebase.auth().createUserWithEmailAndPassword(username1, password1).then(function (result) {
		if (login_saveuser) {
			Cookies.set('c1', username, { expires: 500 });
			console.log(Cookies.get('c1') + 'saved!');
		}
		$("#loading").hide();
	}, function(error) {
		$("#wrongpass1").show();
		$("#loading").hide();
		return;
	});
	} else {
		if (username === "") {
			$("#wrongpass3").show();
		}
		if (password1.length <= 5) {
			$("#wrongpass2").show();
		}
		$("#loading").hide();
	}
	enablebutton("#sign_in");
	enablebutton("#sign_up");
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

//post
function post_clear () {
	$("#post_quote").val("");
	$("#post_author").val("");
}
	