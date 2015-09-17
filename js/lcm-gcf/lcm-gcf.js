// Lasavi and Masavi
//
var M5 = M5 || {};

M5.lcmgcf = function() {

	var num = [];
	var primeFactors = [];
	var results = 1;
	var maxInt2Dig = 99;
	var maxInt3Dig = 999;
	var maxDigits = 2;
	var countWt = 0;
	var nums2dig = [70, 42, 90, 50, 60, 56, 88, 12, 24, 32, 64, 81];
	var nums3dig = [144, 216, 406, 870, 150, 154, 588, 666, 888, 128, 256, 512];

	// Public methods
	function computeGcf() {
		countWt++;

		num = [];

		if (countWt % 5 == 0) {
			num[0] = uGetRandomEvenInt(10, (maxDigits == 2)
					? maxInt2Dig
					: maxInt3Dig);
			num[1] = uGetRandomEvenInt(8, (maxDigits == 2)
					? maxInt2Dig
					: maxInt3Dig);
		} else {
			var rand = uGetRandomInt(0, nums2dig.length - 1);
			num[0] = (maxDigits == 2) ? nums2dig[rand] : nums3dig[rand];
			rand = uGetRandomInt(0, nums2dig.length - 1);
			num[1] = (maxDigits == 2) ? nums2dig[rand] : nums3dig[rand];
		}
		//num[0] = 65;
		//num[1] = 39;
		//num = 46;
		calcGcf();
		return num;
	}

	function ans() {
		return results;
	}

	// Returns an array of strings that are all incorrect answers
	//
	function spoof() {
		var ansList = [];
		var i = 0;

		for (i = 0; i < 4; i++) {
			if (uGetRandomInt(0, 1))
				ansList.push(results + uGetRandomInt(5, 25));
			else
				ansList.push(results - uGetRandomInt(1, results));
		}
		return ansList;

	}

	function max(i) {
		if (i == 0 || i == null || i < 0)
			throw new Error('max:Unknown int i passed =' + i);

		maxDigits = i;
	}

	function getMax() {
		return maxDigits;
	}

	// Private methods
	function calcGcf() {
		var i = 0;
		primeFactors = [];
		var ansInt = [];

		results = 1;

		// Send numbers to calculate and collect for factors
		// Eg.
		// [1,2,2,3,5,5]
		// [1,2,5,5,7]
		//
		M5.factors.calc(num[0]);
		primeFactors[0] = M5.factors.ans();
		uLog('primeFactors_0=' + primeFactors[0].toString());

		M5.factors.calc(num[1]);
		primeFactors[1] = M5.factors.ans();
		uLog('primeFactors_1=' + primeFactors[1].toString());

		ansInt = _.intersection(primeFactors[0], primeFactors[1]);
		//uLog('ansInt=' + ansInt.toString());

		for (i = 0; i < ansInt.length; i++) {
			var len0 = primeFactors[0].length
					- _.without(primeFactors[0], ansInt[i]).length;
			var len1 = primeFactors[1].length
					- _.without(primeFactors[1], ansInt[i]).length;
			//uLog('len0=' + len0 + ',len1=' + len1);
			results *= Math.pow(ansInt[i], Math.min(len0, len1));

		}

		//uLog('results =' + results);

	}

	function computeLcm() {
		var i = 0, j = 0;
		var common = [], rm0 = [], rm1 = [], pf1 = [];
		countWt++;

		num = [];

		if (countWt % 5 == 0) {
			num[0] = uGetRandomEvenInt(10, (maxDigits == 2)
					? maxInt2Dig
					: maxInt3Dig);
			num[1] = uGetRandomEvenInt(8, (maxDigits == 2)
					? maxInt2Dig
					: maxInt3Dig);
		} else {
			var rand = uGetRandomInt(0, nums2dig.length - 1);
			num[0] = (maxDigits == 2) ? nums2dig[rand] : nums3dig[rand];
			rand = uGetRandomInt(0, nums2dig.length - 1);
			num[1] = (maxDigits == 2) ? nums2dig[rand] : nums3dig[rand];
		}
		//num[0] = 65;
		//num[1] = 39;
		//num = 46;
		calcGcf();

		// Eg.
		// [1,2,2,3,5,5]
		// [1,2,5,5,7]
		// GCF  ==[1,2,5] = 10
		// LCM ==[1,2,5, 2,3,5 ,5,7]
		//

		// Make copies of prime factors 1
		for (i = 0; i < primeFactors[1].length; i++)
			pf1[i] = primeFactors[1][i];

		//uLog('pf1 -'+pf1.toString());

		// Find common elements
		for (i = 0; i < primeFactors[0].length; i++) {
			for (j = 0; j < pf1.length; j++) {
				if (primeFactors[0][i] == pf1[j]) {
					common.push(primeFactors[0][i]);
					pf1.splice(j, 1);
					break;
				}

			}

		}

		// Remove common elements
		// Place 0 at the common element and then use underscore lib
		// compact method to remove it. Could have used splice just as
		// well
		//uLog('common before launch -'+common.toString());
		for (i = 0; i < common.length; i++)
			rm(common[i]);

		function rm(ele) {
			for (j = 0; j < primeFactors[0].length; j++) {
				if (ele == primeFactors[0][j]) {
					//uLog('Got hit - ele='+ele);
					primeFactors[0][j] = 0;
					break;
				}
			}

			for (j = 0; j < primeFactors[1].length; j++) {
				if (ele == primeFactors[1][j]) {
					//uLog('Got hit - ele='+ele);
					primeFactors[1][j] = 0;
					break;
				}
			}
		}

		rm0 = _.compact(primeFactors[0]);
		rm1 = _.compact(primeFactors[1]);

		//uLog('rm0=' + rm0.toString() + ',rm1=' + rm1.toString());

		results = 1;
		iterMultiply(common);
		iterMultiply(rm0);
		iterMultiply(rm1);
		uLog('LCM final ans ='+results);
		function iterMultiply(list) {
			for (i = 0; i < list.length; i++)
				results *= list[i];
		}

		return num;

	}

	var oPublic = {
		computeLcm : computeLcm,
		computeGcf : computeGcf,
		ans : ans,
		spoof : spoof,
		max : max,
		getMax : getMax
	}

	return oPublic;
}();
