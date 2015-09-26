var M5 = M5 || {};

M5.varrep = function() {

	var sum = '';
	var rNames = [];
	var rNum, rNumNxt;
	var rThing = null;
	var op = ['+', '-', 'x', '/'];
	var names = ['Deep', 'Suraj', 'Aparna', 'Nandita', 'Sheetal', 'Roshni',
			'Ankushi', 'Karshima', 'Tushar', 'Sushmita'];
	var phyAttr = [['inches', 'taller', 'shorter', 'height'],
			['kgs', 'fatter', 'thinner', 'weight'],
			['years', 'older', 'younger', 'age']];
	var mSelOp;
	var mFlagHard = false;
	var correctAns;

	// Public
	function compute(flagHard) {
		mFlagHard = flagHard;
		sum = '';
		rNames = [];

		if (flagHard)
			computeHard();
		else
			computeSimple();

		return sum;

	}

	function ans() {
		return correctAns;
	}

	function spoof() {
		var smartAns = [];

		if (mFlagHard) {
			switch (mSelOp) {
				case op[0] :
					smartAns = [rNumNxt + rNum,
							correctAns - uGetRandomInt(1, correctAns),
							correctAns + uGetRandomInt(1, 19), rNumNxt + rNum];
					break;
				case op[1] :
					smartAns = [correctAns + uGetRandomInt(1, 19),
							correctAns - uGetRandomInt(1, correctAns),
							rNumNxt - rNum, correctAns + uGetRandomInt(1, 19)];
					break;
				case op[2] :
					smartAns = [correctAns + uGetRandomInt(1, 19),
							correctAns - uGetRandomInt(1, correctAns),
							rNumNxt * rNum,
							correctAns - uGetRandomInt(1, correctAns)];
					break;
				case op[3] :
					smartAns = [correctAns + uGetRandomInt(1, 19),
							correctAns - uGetRandomInt(1, correctAns),
							rNumNxt / rNum,
							correctAns - uGetRandomInt(1, correctAns)];
					break;
				default :
					throw new Error('Unknown op selected:mSelOp=' + mSelOp);
					break;
			}
		} else {
			switch (mSelOp) {
				case op[0] :
					smartAns = [rNum + '* j', rNum + '/ k', rNum + '/ z',
							rNum + '* y'];
					break;
				case op[1] :
					smartAns = ['j + ' + rNum, 'k + ' + rNum, rNum + '/ z',
							'y * ' + rNum];
					break;
				case op[2] :
					smartAns = [rNum + '+ j', rNum + '/ k', rNum + '/ z',
							rNum + '- y'];
					break;
				case op[3] :
					smartAns = [rNum + '* j', rNum + '+ k', rNum + '- z',
							rNum + '* y'];
					break;
				default :
					throw new Error('Unknown op selected:mSelOp=' + mSelOp);
					break;
			}
		}
		return smartAns;

	}

	// Deep is 4 years younger than Suraj
	// Suraj is 8 inches taller than Sheetal
	// Sheetal is 3 times the age of Karishma
	// Roshni is half the age of Deep
	//
	function computeSimple() {
		var n1 = names[uGetRandomInt(0, (names.length / 2) - 1)];
		var n2 = names[uGetRandomInt((names.length / 2), names.length - 1)];
		rNames.push(n1);
		rNames.push(n2);
		mSelOp = op[uGetRandomInt(0, op.length - 1)];
		switch (mSelOp) {
			case op[0] :
				addSimple();
				break;
			case op[1] :
				subSimple();
				break;
			case op[2] :
				mulSimple();
				break;
			case op[3] :
				divSimple();
				break;
			default :
				throw new Error('Unknown op selected:mSelOp=' + mSelOp);
				break;
		}
		return sum;

	}

	function addSimple() {
		sum += rNames[0];
		rNum = uGetRandomInt(1, 19);
		var randAttr = phyAttr[uGetRandomInt(1, phyAttr.length - 1)];
		sum += ' is ' + rNum + ' ' + randAttr[0] + ' ' + randAttr[1] + ' than ';
		sum += rNames[1];

		correctAns = 'x + ' + rNum;

	}

	function subSimple() {
		sum += rNames[0];
		rNum = uGetRandomInt(1, 19);
		var randAttr = phyAttr[uGetRandomInt(1, phyAttr.length - 1)];
		sum += ' is ' + rNum + ' ' + randAttr[0] + ' ' + randAttr[2] + ' than ';
		sum += rNames[1];

		correctAns = 'n - ' + rNum;

	}

	function mulSimple() {
		sum += rNames[0];
		rNum = uGetRandomInt(1, 19);
		var randAttr = phyAttr[uGetRandomInt(1, phyAttr.length - 1)];
		sum += ' is ' + rNum + ' times ' + randAttr[1] + ' than ';
		sum += rNames[1];

		correctAns = rNum + ' x q';

	}

	function divSimple() {
		sum += rNames[0];
		rNum = uGetRandomInt(1, 19);
		var randAttr = phyAttr[uGetRandomInt(1, phyAttr.length - 1)];
		sum += ' is 1/' + rNum + ' times ' + randAttr[1] + ' than ';
		sum += rNames[1];

		correctAns = ' r /' + rNum;

	}

	// Deep is 4 years younger than Suraj. Deep's age is 24. What is Suraj's age?
	// Suraj is 8 inches shorter than Sheetal. Suraj's height is 167 inches. What is Sheetal's height?
	// Sheetal is 3 times the age of Karishma. Karishma is 26 years old. What is Sheetal's age?
	// Roshni is half the age of Deep. Deep is 12 years old. What is Roshni's age?
	//
	function computeHard() {
		var n1 = names[uGetRandomInt(0, (names.length / 2) - 1)];
		var n2 = names[uGetRandomInt((names.length / 2), names.length - 1)];
		rNames.push(n1);
		rNames.push(n2);
		mSelOp = op[uGetRandomInt(0, op.length - 1)];
		switch (mSelOp) {
			case op[0] :
				addHard();
				break;
			case op[1] :
				subHard();
				break;
			case op[2] :
				mulHard();
				break;
			case op[3] :
				divHard();
				break;
			default :
				throw new Error('Unknown op selected:mSelOp=' + mSelOp);
				break;
		}
		return sum;

	}

	// Deep is 4 years older than Suraj. Deep's age is 24. What is Suraj's age?

	function addHard() {
		var attrIndex = uGetRandomInt(1, phyAttr.length - 1);
		sum += rNames[0];
		rNum = uGetRandomInt(1, 19);
		rNumNxt = uGetRandomInt(rNum, 50);
		var randAttr = phyAttr[attrIndex];
		sum += ' is ' + rNum + ' ' + randAttr[0] + ' ' + randAttr[1] + ' than ';
		sum += rNames[1];
		sum += '. ' + rNames[0] + '\'s ' + phyAttr[attrIndex][3] + ' is '
				+ rNumNxt + ' ' + phyAttr[attrIndex][0] + '.';
		sum += 'What is ' + rNames[1] + '\'s ' + phyAttr[attrIndex][3] + ' ?';

		correctAns = rNumNxt - rNum;

	}

	// Suraj is 8 inches shorter than Sheetal. Suraj's height is 167 inches. What is Sheetal's height?

	function subHard() {
		var attrIndex = uGetRandomInt(1, phyAttr.length - 1);
		sum += rNames[0];
		rNum = uGetRandomInt(1, 19);
		rNumNxt = uGetRandomInt(rNum, 50);
		var randAttr = phyAttr[attrIndex];
		sum += ' is ' + rNum + ' ' + randAttr[0] + ' ' + randAttr[2] + ' than ';
		sum += rNames[1];
		sum += '. ' + rNames[0] + '\'s ' + phyAttr[attrIndex][3] + ' is '
				+ rNumNxt + ' ' + phyAttr[attrIndex][0] + '.';
		sum += 'What is ' + rNames[1] + '\'s ' + phyAttr[attrIndex][3] + ' ?';
		correctAns = rNumNxt + rNum;

	}
	// Sheetal is 3 times the age of Karishma. Sheetal is 27 years old.
	// What is Karisma's age?

	function mulHard() {
		var attrIndex = uGetRandomInt(1, phyAttr.length - 1);
		sum += rNames[0];
		rNum = uGetRandomInt(1, 19);
		rNumNxt = uGetRandomInt(1, 19) * rNum;
		var randAttr = phyAttr[attrIndex];
		sum += ' is ' + rNum + ' times ' + randAttr[1] + ' than ';
		sum += rNames[1];
		sum += '. ' + rNames[0] + '\'s ' + phyAttr[attrIndex][3] + ' is '
				+ rNumNxt + phyAttr[attrIndex][0] + '.';
		sum += 'What is ' + rNames[1] + '\'s ' + phyAttr[attrIndex][3] + ' ?';
		correctAns = (rNumNxt / rNum);

	}

	// Roshni is half the age of Deep. Roshni is 12 years old. What is Deep's age?

	function divHard() {
		var attrIndex = uGetRandomInt(1, phyAttr.length - 1);
		rNum = uGetRandomInt(1, 8);
		rNumNxt = uGetRandomInt(1, 19);
		var randAttr = phyAttr[attrIndex];
		sum += rNames[0];
		sum += ' is 1/' + rNum + ' times ' + randAttr[1] + ' than ';
		sum += rNames[1];
		sum += '. ' + rNames[0] + '\'s ' + phyAttr[attrIndex][3] + ' is '
				+ rNumNxt + phyAttr[attrIndex][0] + '.';
		sum += ' What is ' + rNames[1] + '\'s ' + phyAttr[attrIndex][3] + ' ?';
		correctAns = (rNumNxt * rNum);

	}

	var oPublic = {
		compute : compute,
		ans : ans,
		spoof : spoof
	}

	return oPublic;
}();
