// Prime factorisation - Muul Avayav
//
var M5 = M5 || {};

M5.factors = function() {

	var num = -999;
	var results = [1];
	var maxInt = 99;

	// Public methods
	function compute() {
		num = uGetRandomInt(1, maxInt);
		//num = 46;
		calc(num);
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
			var spoofAns = new Array();

			copyAns(spoofAns);
			spoofAns.push(uGetRandomInt(2, 9));
			spoofAns.sort();
			spoofAns.sort(function(a, b) {
				return a - b;
			});
			ansList[i] = spoofAns.toString().replace(/,/g, "x");

		}

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

	// Used in LCM and GCF calculations as well!
	function calc(n) {
		var i = 0;

		// Every number is divisible by 1
		results = [1];
		iterate(n);
		uLog('results=' + results);

		function iterate(n) {

			//uLog('n=' + n);
			if (n < 4) {
				results.push(n);
				return;
			}

			if (n % 2 == 0) {
				results.push(2);
				iterate(n / 2);
			} else {
				i = 3;
				var root = Math.floor(Math.sqrt(n));
				//uLog('root=' + root);

				if (i > root)
					results.push(n);
				else {
					var bGotHit = false;
					for (i = 3; i <= root; i = i + 2) {
						if (n % i == 0) {
							bGotHit = true;
							//uLog('n=' + n + ',i=' + i);
							results.push(i);
							iterate(n / i);
							break;
						}
					}

					if (!bGotHit)
						results.push(n);
				}
			}
		}
	}

	// Private methods
	function copyAns(a) {
		var i = 0;
		var length = results.length;

		for (i = 0; i < length; i++)
			a[i] = results[i];

	}

	var oPublic = {
		compute : compute,
		calc:calc,
		ans : ans,
		spoof : spoof,
		max : max,
		getMax : getMax
	}

	return oPublic;
}();
