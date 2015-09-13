// utilities.js - All kitchen sink utilities functions
// 8/9/2014
// Amod Joshi
//

/*
 * Debug toolkit - 1) Differentiated services for logging errors,warnings and
 * notes 2) Asserts
 */

var DEBUG = true;

/*
 * The function existy is meant to define the existence of something. JavaScript
 * has two values�\null and undefined�\that signify nonexistence. Thus, existy
 * checks that its argument is neither of these things
 */
function uExisty(x) {
	return x != null
};

/*
 * The truthy function is used to determine if something should be considered a
 * synonym for true
 */
function uTruthy(x) {
	return uExisty(x) && (x !== false);
};

function uNotNull(x) {
	return uExisty(x);
};

function uFail(thing) {
	throw new Error(thing);
}
function uWarn(thing) {
	console.log(["WARNING:", thing].join(' '));
}
function uLog(thing) {
	if (DEBUG)
		console.log(["LOG:", thing].join(' '));
}

/* Check if exp is true, else throws up an error message msg */
function uAssertTrue(exp, msg) {
	if (DEBUG) {
		if (uTruthy(exp))
			return;
		else
			uFail(['ASSERTION failure:', msg].join(' '));
	}
}

/* Check if exp is not null, else throws up an error message msg */
function uAssertNotNull(exp, msg) {
	if (DEBUG) {
		if (uNotNull(exp))
			return;
		else
			uFail(['ASSERTION failure:', msg].join(' '));
	}
}

// Asserts that the passed number is of primitive type number, else throws an error.
// Depends on underscore.js
//
function uAssertIsNumber(num) {
	if (DEBUG) {
		if (_.isNumber(num) && (!_.isNaN(num)))
			return;
		else
			uFail(['ASSERTION failure:', 'Rats...' + num + 'is not a number!']
					.join(' '));
	}
}

// Print stack on exception of exception object e
//
function uPrintStack(e) {
	var trace = printStackTrace({
		e : e
	});
	console.error('Error!\n' + 'Message: ' + e.message + '\nStack trace:\n'
			+ trace.join('\n'));
}

//Returns a random integer between min and max - inclusive
//Using Math.round() will give you a non-uniform distribution!
function uGetRandomInt(min, max) {
	return parseInt(Math.floor(Math.random() * (max - min + 1) + min));
}

function uGetRandomEvenInt(min, max) {
	var num=1;

	while(num %2 != 0)
		calc();

	return num;
	function calc() {
		 num = parseInt(Math.floor(Math.random() * (max - min + 1) + min));
	}

}

//Returns a random "STRING" decimal between min and max - inclusive.
// Remember, a string is returned as we do a toFixed.
// The calling funcion needs to use parseFloat to convert to number.
function uGetRandomDecString(min, max) {
	return (Math.random() * (max - min + 1) + min).toFixed(2);
}

function pronouncedClick($ele) {
	var timer = 0;
	$ele.css('background-image', 'none').css('background-color', '#444444');// deep
	// blue
	if (!timer) {
		timer = setTimeout(function() {

			$ele.css('background-image', 'none').css('background-color',
					'#999999');// light blue

			timer = 0;
		}, 250);
	}
}
