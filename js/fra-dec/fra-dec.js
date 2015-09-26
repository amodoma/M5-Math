var M5 = M5 || {};

M5.fradec = function() {

	var sum = '';
	var correctAns;
	var mUp, mDn;// used in dec=>fra
	var mNum, mDen;// used in Fra multiply
	var smartAns = [];
	var lessons;

	// Public
	function init($rootScope) {
		// Object that has properties corresponding to each sub lesson
		// Used to reduce branch if-then-else horror
		// Used in compute and to spoof answers
		//
		lessons = {
			kFraAdd : {
				en : $rootScope.settings.enFraAdd,
				compute : computeFraAdd,
				arg : fnSmartFraAdd
			},
			kFraMul : {
				en : $rootScope.settings.enFraMul,
				compute : computeFraMul,
				arg : fnSmartFraMul
			},
			kDecAdd : {
				en : $rootScope.settings.enDecAdd,
				compute : computeDecAdd,
				arg : fnSmartDecAdd
			},
			kDecMul : {
				en : $rootScope.settings.enDecMul,
				compute : computeDecMul,
				arg : fnSmartDecMul
			},
			kFra2Dec : {
				en : $rootScope.settings.enFra2Dec,
				compute : computeFra2Dec,
				arg : fnSmartFra2Dec
			},
			kDec2Fra : {
				en : $rootScope.settings.enDec2Fra,
				compute : computeDec2Fra,
				arg : fnSmartDec2Fra
			}
		};

	}
	function compute($rootScope) {
		sum = '';

		// Branch to each sub lesson
		for ( var l in lessons) {
			if (lessons[l].en)
				lessons[l].compute();
		}

		return sum;

	}

	function ans() {
		return correctAns;
	}

	function spoof($rootScope) {
		smartAns = [];

		function genColl(fn) {
			var i = 0;

			for (i = 0; i < 4; i += 1) {
				smartAns.push(fn());
			}

		}

		// Generate smart answer b calling corresponding routine
		for ( var l in lessons) {
			if (lessons[l].en)
				genColl(lessons[l].arg)
		}

		uLog('smartAns = ' + smartAns.toString());
		return smartAns;

	}

	// 1/2 + 1/2, 1/2 - 1/3
	//
	function computeFraAdd() {
		var up_1 = uGetRandomInt(0, 9);
		var dn_1 = uGetRandomInt(up_1 + 1, 100);
		var up_2 = uGetRandomInt(0, 9);
		var dn_2 = uGetRandomInt(up_2 + 1, 100);

		correctAns = ((up_1 / dn_1) + (up_2 / dn_2)).toFixed(2);
		uLog('correctAns =' + correctAns);
		sum += up_1 + '/' + dn_1 + ' + ' + up_2 + '/' + dn_2;
		return sum;

	}

	// 1/3 * 1/4
	//
	function computeFraMul() {
		var up_1 = uGetRandomInt(0, 9);
		var dn_1 = uGetRandomInt(up_1 + 1, 100);
		var up_2 = uGetRandomInt(0, 9);
		var dn_2 = uGetRandomInt(up_2 + 1, 100);

		mNum = (up_1 * up_2);
		mDen = (dn_1 * dn_2);
		correctAns = mNum + '/' + mDen;
		uLog('correctAns =' + correctAns);
		sum += up_1 + '/' + dn_1 + ' * ' + up_2 + '/' + dn_2;
		return sum;

	}

	// 0.35+0.2,0.07+0.3
	//
	function computeDecAdd() {
		var up_1 = uGetRandomInt(0, 9);
		var dn_1 = uGetRandomInt(up_1 + 1, 100);
		var up_2 = uGetRandomInt(0, 9);
		var dn_2 = uGetRandomInt(up_2 + 1, 100);

		correctAns = ((up_1 / dn_1) + (up_2 / dn_2)).toFixed(2);
		uLog('correctAns =' + correctAns);
		sum += (up_1 / dn_1).toFixed(2) + ' + ' + (up_2 / dn_2).toFixed(2);
		return sum;

	}

	// 0.76 * 0.88,0.9 * 0.32
	//
	function computeDecMul() {
		var up_1 = uGetRandomInt(0, 9);
		var dn_1 = uGetRandomInt(up_1 + 1, 100);
		var up_2 = uGetRandomInt(0, 9);
		var dn_2 = uGetRandomInt(up_2 + 1, 100);

		correctAns = ((up_1 / dn_1) * (up_2 / dn_2)).toFixed(2);
		uLog('correctAns =' + correctAns);
		sum += (up_1 / dn_1).toFixed(2) + ' * ' + (up_2 / dn_2).toFixed(2);
		return sum;

	}

	// 1/2 => 0.5, 1/3 => 0.333,4/8 => 0.5
	//
	function computeFra2Dec() {
		var up = uGetRandomInt(0, 9);
		var dn = uGetRandomInt(up + 1, 100);
		correctAns = (up / dn).toFixed(2);
		uLog('correctAns =' + correctAns);
		sum += up + '/' + dn;
		return sum;

	}

	// 5/10 =>1/2=>0.5, 1/3 => 0.333,4/8 => 0.5
	//
	function computeDec2Fra() {
		mUp = uGetRandomInt(0, 9);
		mDn = uGetRandomInt(mUp + 1, 100);
		sum += (mUp / mDn).toFixed(2);
		correctAns = mUp + '/' + mDn;
		uLog('correctAns =' + correctAns);
		return sum;

	}

	// Smart answer spoofing
	var fnSmartFraAdd = function() {
		return fnSmartFra2Dec();
	}

	var fnSmartDecAdd = function() {
		return fnSmartFra2Dec();
	}

	var fnSmartDecMul = function() {
		return fnSmartDecAdd();
	}

	var fnSmartFraMul = function() {
		var n, d;
		if (uGetRandomInt(0, 1)) {
			n = mNum + uGetRandomInt(1, 100);
			d = mDen + uGetRandomInt(1, 100);
		} else {
			n = mNum - uGetRandomInt(1, mNum);
			d = mDen - uGetRandomInt(1, mDen);
		}
		if (_.isNaN(n))
			throw new Error('NaN detected!');

		if (_.isNaN(d))
			throw new Error('NaN detected!');

		//uLog('n=' + n);
		//uLog('d=' + d);

		// Polyfill
		Number.isInteger = Number.isInteger
				|| function(value) {
					return typeof value === "number" && isFinite(value)
							&& Math.floor(value) === value;
				};

		if (Number.isInteger(n) === false)
			n = new Number(n).toFixed(2);

		if (Number.isInteger(d) === false)
			d = new Number(d).toFixed(2);

		return (n + '/' + d);
	}

	var fnSmartDec2Fra = function() {
		var n, d;
		if (uGetRandomInt(0, 1)) {
			n = mUp + uGetRandomInt(1, 5);
			d = mDn + uGetRandomInt(-5, -1);
		} else {
			n = mUp + uGetRandomInt(-1, -5);
			d = mDn + uGetRandomInt(1, 5);
		}
		if (_.isNaN(n))
			throw new Error('NaN detected!');

		if (_.isNaN(d))
			throw new Error('NaN detected!');
		return n + ' / ' + d;
	}

	var fnSmartFra2Dec = function() {
		var n;
		if (uGetRandomInt(0, 1))
			n = (correctAns * 100) + uGetRandomInt(1, 100);
		else
			n = (correctAns * 100) - uGetRandomInt(1, correctAns * 100);

		if (_.isNaN(n))
			throw new Error('NaN detected!');

		return (n / 100).toFixed(2);
	}

	var oPublic = {
		init : init,
		compute : compute,
		ans : ans,
		spoof : spoof
	};

	return oPublic;
}();
