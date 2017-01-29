function loaded () {
	if($(".pace-inactive").css('display') == 'none'){
		$("#website").show('scale', 200);
		var loaded = true;
		nav_home();
		clearInterval(interval);
		removejscssfile("dataurl.css", "css");
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
/*function getPost () {
	var database = firebase.database();
	var date = + new Date();
	var oneweek = date - 604800000;
	var recentposts = firebase.database().ref('/').limitToFirst(50)
	var recentposts1 = JSON.stringify(recentposts)
	/*var snap = snapshot.val();

	console.log(recentposts1);


}*/
function getPost (number) {
	var previous = 'none';
	var current_date = + new Date();
	var oneweek = current_date - 604800000;
	var database = firebase.database().ref().child("posts").limitToLast(number);
	database.on("child_added", snap => {
		var date = snap.child("date").val();
		if (date > oneweek) {
			var likes = snap.child("likes").val();
			var poster = snap.child("poster").val();
			var author = snap.child("author").val();
			var quote = snap.child("quote").val();
			showPost(likes, poster, author, quote, date, previous);
			previous = date;
		} else {
			firebase.database().ref("posts/" + date).remove();
		}

	});
}
function showPost (likes, poster, author, quote, date, previous) {
	if (previous === 'none') {
		$("<div class='post'><div class='poster'></div><div class='likes'></div><div class='author'></div><div class='quote'></div><div class='date'></div></div>").appendTo("#entire_home");
		$('.post').first().attr('id', date);
		console.log('firstpostloaded');
	} else {
		var previous1 = '#' + previous
		$("<div class = 'post'><div class='poster'></div><div class='likes'></div><div class='author'></div><div class='quote'></div><div class='date'></div></div>").insertBefore(previous1);			
		$('.post').first().attr('id', date);
		console.log('postloaded');
	}
	
}
function newPost (auth, quote1) {
	var database = firebase.database();
	var current_username = $("#nav_me").html();
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
	if (quote != "") {
		newPost(author, quote);
	} else {
		$("#post_error").show("shake", 300);
	}
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
	$("#post_error").hide();
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
}
function createuser () {
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
	firebase.auth().createUserWithEmailAndPassword(username1, password1).then(function (result) {
		if (login_saveuser) {
			Cookies.set('c1', username, { expires: 500 });
			console.log(Cookies.get('c1') + 'saved!');
		}
		firebase.signInWithEmailAndPassword(username1, password1);
		$("#loading").hide();
	}, function(error) {
		$("#wrongpass1").show();
		$("#loading").hide();
		return;
	});
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
	