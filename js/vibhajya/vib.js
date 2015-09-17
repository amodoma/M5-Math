var M5 = M5 || {};

M5.vib = function() {

	var num = -999;
	var divisible = [1];
	var inDivisible = [];
	var maxInt = 99;

	// Public methods
	function compute() {
		num = uGetRandomInt(5, maxInt);
		//num = 92;
		calc(num);
		return num;
	}

	function ans() {
		var length = divisible.length;
		return divisible[uGetRandomInt(0, length-1)];
	}

	// Returns an array of strings that are all incorrect answers
	//
	function spoof() {
		var length = inDivisible.length;
		var ansList = [];
		var i = 0;

		for (i = 0; i < 4; i++)
			ansList[i] = inDivisible[uGetRandomInt(0, length-1)];

		return ansList;

	}

	function max(i) {
		if (i == 0 || i == null || i < 0)
			throw new Error('max:Unknown int i passed =' + i);

		maxInt = i;
	}

	function getMax() {
		return maxInt;
	}

	// Private methods
	function calc(n) {
		var i = 0;
		var limit;
		divisible = [1];
        inDivisible = [];

		divisible.push(n);

		if (n % 2 == 0) {//Even flow
			divisible.push(2);
			limit = n / 2;
			segregate();
		} else {//Odd flow
			limit = Math.floor(n / 2) + 1;
			segregate();
		}

		uLog('divisible='+divisible.toString());
		uLog('inDivisible='+inDivisible.toString());

		function segregate() {
			for (i = 3; i <= limit; i++) {
				if (n % i == 0)
					divisible.push(i);
				else
					inDivisible.push(i);
			}

			for (i = (limit + 1); i < n; i++)
				inDivisible.push(i);

		}

	}

	function copyAns(a) {
		var i = 0;
		var length = results.length;

		for (i = 0; i < length; i++)
			a[i] = results[i];

	}

	var oPublic = {
		compute : compute,
		ans : ans,
		spoof : spoof,
		max : max,
		getMax : getMax
	}

	return oPublic;
}();
