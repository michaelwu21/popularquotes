function mathcalc () {
	var value= $("#result1").html();
	var valuefixed = value.replace(/x/g, "*");
	
	try {
		var result = math.eval(valuefixed);
		var resultrounded = math.round(result, 12);
		$("#result1").html(resultrounded);
	} catch(err) {
		$("#calc_error").show();
	}
}

function addnum (y) {
	$("#calc_error").hide();
	$("#calc_limit").hide();
	var current_value = $("#result1").html();
	if (current_value.length < 30) {
		var new_value = current_value + y;
		$("#result1").html(new_value);
	} else {
		$("#calc_limit").show();
	}
}

function removenum () {
	$("#calc_error").hide();
	$("#calc_limit").hide();
	var current = $("#result1").html();
	var removed1 = current.slice(0, -1);
	$("#result1").html(removed1);
}

function removeallnum () {
	$("#calc_error").hide();
	$("#calc_limit").hide();
	$("#result1").html("");
}
function addzero () {
	$("#calc_error").hide();
	$("#calc_limit").hide();
	var current_value = $("#result1").html();
	if (current_value.length < 30) {
		var new_value = current_value + 0;
		$("#result1").html(new_value);
	} else {
		$("#calc_limit").show();
	}
}