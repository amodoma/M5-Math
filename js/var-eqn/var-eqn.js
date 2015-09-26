var M5 = M5 || {};

M5.vareqn = function() {

	// Common
	var sum = '';
	var v1;
	var vars = ['x', 'y', 'z', 'a', 'b', 't', 'm', 'n', 'j', 'k'];

	// Simple problem
	var rNumLhs, rNumRhs;
	var op = ['+', '-', 'x', '/'];

	// Hard problem
	var aNumLhs = [], aNumRhs = []; //[12,978,9889]
	var aVarsLhs = [], aVarsRhs = [];//[3,1,6,5]

	//Common
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
		var spCaseAns;

		if (mFlagHard) {
			smartAns = [correctAns + uGetRandomInt(1, 19),
					correctAns + uGetRandomInt(1, 19),
					correctAns - uGetRandomInt(1, 19),
					correctAns - uGetRandomInt(1, 19)];
		} else {
			switch (mSelOp) {
				case op[0] :
					smartAns = [correctAns + uGetRandomInt(1, 19),
							correctAns - uGetRandomInt(1, correctAns),
							rNumRhs + rNumLhs,
							correctAns + uGetRandomInt(1, 19)];
					break;
				case op[1] :
					smartAns = [correctAns + uGetRandomInt(1, 19),
							correctAns - uGetRandomInt(1, correctAns),
							rNumRhs - rNumLhs,
							correctAns + uGetRandomInt(1, 19)];
					break;
				case op[2] :
					// Change mul answer if one of the operands is 1
					if (rNumRhs === 1 || rNumLhs === 1)
						spCaseAns = correctAns - uGetRandomInt(1, correctAns);
					else
						spCaseAns = rNumRhs * rNumLhs;
					smartAns = [correctAns + uGetRandomInt(1, 19),
							correctAns - uGetRandomInt(1, correctAns),
							spCaseAns, correctAns + uGetRandomInt(1, 19)];
					break;
				case op[3] :
					// Change mul answer if one of the operands is 1
					if (rNumRhs === 1 || rNumLhs === 1)
						spCaseAns = correctAns - uGetRandomInt(1, correctAns);
					else
						spCaseAns = rNumRhs / rNumLhs;
					smartAns = [correctAns + uGetRandomInt(1, 19),
							correctAns - uGetRandomInt(1, correctAns),
							spCaseAns, correctAns + uGetRandomInt(1, 19)];
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
		v1 = vars[uGetRandomInt(0, vars.length - 1)];
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
		rNumLhs = uGetRandomInt(1, 10);
		rNumRhs = uGetRandomInt(rNumLhs, 20);
		sum += v1;
		sum += ' + ' + rNumLhs + ' = ' + rNumRhs;

		correctAns = rNumRhs - rNumLhs;

	}

	function subSimple() {
		rNumLhs = uGetRandomInt(1, 10);
		rNumRhs = uGetRandomInt(rNumLhs, 20);
		sum += v1;
		sum += ' - ' + rNumLhs + ' = ' + rNumRhs;

		correctAns = rNumRhs + rNumLhs;

	}

	function mulSimple() {
		rNumLhs = uGetRandomInt(1, 10);
		rNumRhs = rNumLhs * uGetRandomInt(1, 8) * uGetRandomInt(rNumLhs, 20);
		sum += v1;
		sum += ' * ' + rNumLhs + ' = ' + rNumRhs;

		correctAns = rNumRhs / rNumLhs;

	}

	function divSimple() {
		rNumLhs = uGetRandomInt(1, 10);
		rNumRhs = rNumLhs * uGetRandomInt(1, 8) * uGetRandomInt(rNumLhs, 20);
		sum += v1;
		sum += ' / ' + rNumLhs + ' = ' + rNumRhs;

		correctAns = rNumRhs * rNumLhs;

	}

	// 2x + 5 = 897
	// 4z - 289 = 983
	// a*5 + 980 = 980
	// b/5 = 982 + b;
	//
	function computeHard() {
		v1 = vars[uGetRandomInt(0, vars.length - 1)];
		hardSumAllOp();
		return sum;

	}

	// Example LHS
	// [12,978,9889]
	// [3,1,6,5]
	//
	function hardSumAllOp() {
		var sLhs, sRhs;
		var numerator, denominator;
		var bCompleteDivisible;

		// Search for an answer that is an integer
		do {
			// [12,978,9889]
			aNumLhs = constructArray(4, 999, 999999);
			aNumRhs = constructArray(2, 999, 999999);

			// [3,1,6,5]
			aVarsLhs = constructArray(5, 0, 10);
			aVarsRhs = constructArray(3, 0, 10);

			numerator = addEle(aNumRhs) - addEle(aNumLhs);
			denominator = addEle(aVarsLhs) - addEle(aVarsRhs);
			bCompleteDivisible = ((numerator % denominator) === 0);

		} while (!bCompleteDivisible);

		// LHS
		sLhs = createShuffledString(aVarsLhs, aNumLhs);

		// RHS
		sRhs = createShuffledString(aVarsRhs, aNumRhs);

		//uLog('sLhs=' + sLhs + ',sRhs=' + sRhs);
		sum = sLhs + ' = ' + sRhs;
		correctAns = numerator / denominator;

		uLog('correctAns = ' + correctAns);

	}

	// Input - number of elements and a range min,max
	// Returns - an Integer array
	function constructArray(elements, min, max) {
		var set = [];
		var i = 0;

		for (i = 0; i < elements; i += 1) {
			set.push(uGetRandomInt(min, max));
		}

		// return a shallow copy
		return set.slice();

	}

	function createShuffledString(a1, a2) {
		var aVarsMulVar = [], aShuffled = [];
		var s;
		// Add variable into each array element
		//[3z,1z,6z,5z]
		aVarsMulVar = _.map(a1, function(num) {
			return num + v1;
		});

		// [9889,3z,1z,6z,978,5z,12]
		aShuffled = _.shuffle(_.union(aVarsMulVar, a2));

		uLog('aShuffled=' + aShuffled);

		// 9889+3z+1z+6z+978+5z+12+
		s = _.reduce(aShuffled, function(memo, num) {
			return memo + num + '+';
		}, '');

		// Remove last +
		s = _.initial(s.split("")).join("");

		return s;

	}

	function addEle(a) {
		if (!_.isArray(a))
			throw new Error("Passed object is not an array");

		return _.reduce(a, function(memo, num) {
			return memo + num
		}, 0);

	}

	var oPublic = {
		compute : compute,
		ans : ans,
		spoof : spoof
	}

	return oPublic;
}();
