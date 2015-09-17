// Word math problems
//
var M5 = M5 || {};

M5.wordMath = function() {
	var sum = '';
	var rName = null;
	var rThing = null;
	var rNumInit = -1;
	var rNumAdd = -1;
	var sums = [];
	var op = ['+', '-', 'x', '/'];
	var names = ['Deep', 'Suraj', 'Aparna', 'Nandita', 'Sheetal', 'Roshni',
			'Ankushi', 'Karshima','Tushar','Sushmita'];
	var things = ['marbles', 'kites', 'balls', 'pens','books','sweets','pencils'];
	var correctAns = -1;

	//Public
	function compute() {
		sum = '';
		var selOp = op[uGetRandomInt(0, op.length - 1)];

		rName = randName();
		sum += rName;
		rThing = randThing();

		switch (selOp) {
			case op[0] :
				add();
				break;
			case op[1] :
				sub();
				break;
			case op[2] :
				mul();
				break;
			case op[3] :
				div();
				break;
			default :
				throw new Error('Unknown op selected!');
				break;

		}
		return sum;
	}

	function spoof() {

		return [correctAns + uGetRandomInt(1, 99),
				correctAns + uGetRandomInt(1, 99),
				correctAns + uGetRandomInt(1, 99),
				correctAns + uGetRandomInt(1, 99)];

	}

	function ans() {
		return correctAns;
	}

	// Private
	function add() {
		rNumInit = uGetRandomInt(0, 99999);
		rNumAdd = uGetRandomInt(1, 99999);
		sum += ' has ' + rNumInit + ' ' + rThing + '. ' + rName + ' found '
				+ rNumAdd + ' on the road. How many total items does ' + rName
				+ ' have?';

		correctAns = rNumInit + rNumAdd;
	}

	function sub() {
		rNumInit = uGetRandomInt(0, 99999);
		rNumAdd = uGetRandomInt(1, rNumInit);
		sum += ' has ' + rNumInit + ' ' + rThing + '. ' + rName + ' lost '
				+ rNumAdd + ' on the road. How many total items does ' + rName
				+ ' have?';

		correctAns = rNumInit - rNumAdd;
	}

	function mul() {
		rNumInit = uGetRandomInt(0, 99999);
		rNumAdd = uGetRandomInt(1, 99999);
		var rNumMul = uGetRandomInt(1, 99);
		var rNumHrs = uGetRandomInt(1, 12);
		sum += ' has ' + rNumInit + ' ' + rThing + '. ' + rName + ' got '
				+ rNumMul + ' items every min over the next ' + rNumHrs
				+ 'hrs. How many total items does ' + rName
				+ ' have in the end?';

		correctAns = rNumInit + (rNumMul * 60 * rNumHrs);
	}

	function div() {
		correctAns = uGetRandomInt(0, 99999);
		var rFriends = uGetRandomInt(1, 10);
		rNumInit = correctAns * rFriends;
		sum += ' has ' + rNumInit + ' ' + rThing + '. ' + rName
				+ ' gave all of it equally to ' + rFriends
				+ ' friends. How many total items does each friend have?';

	}

	function randName() {
		return names[uGetRandomInt(0, names.length - 1)]
	}

	function randThing() {
		return things[uGetRandomInt(0, things.length - 1)]
	}

	var oPublic = {
		compute : compute,
		ans : ans,
		spoof : spoof
	}

	return oPublic;

}();
