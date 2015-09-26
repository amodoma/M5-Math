var M5 = M5 || {};

M5.routines = function() {

	var names_en = [['Deep', 'm'], ['Suraj', 'm'], ['Aparna', 'f'],
			['Nandita', 'f'], ['Sheetal', 'f'], ['Roshni', 'f'],
			['Ankushi', 'f'], ['Karshima', 'f'], ['Tushar', 'm'],
			['Sushmita', 'f']];
	var things_en = ['marbles', 'kites', 'balls', 'pens', 'books', 'sweets',
			'pencils'];

	var names_mr = [['दीप', 'm'], ['सुरज', 'm'], ['अपर्णा', 'f'],
			['नांदिता', 'f'], ['शीतल', 'f'], ['रोशनी', 'f'], ['अंकुशी', 'f'],
			['करिश्मा', 'f'], ['तुषार', 'm'], [' सुश्मिता', 'f']];

	var things_mr = ['पतंग', 'चेंडू', 'पेन्स', ' पेन्सिल्स', ' पुस्तक'];

	var getSimpleHardKeys = function(ary, obj) {
		for ( var prop in obj) {
			if (obj[prop] == "Simple") {
				ary[0] = prop;
			}

			if (obj[prop] == "Hard") {
				ary[1] = prop;
			}
		}

	}

	var getDigitsKeys = function(ary, obj) {
		for ( var prop in obj) {
			if (obj[prop] == "Two digits" || obj[prop] == "Three digits"
					|| obj[prop] == "Four digits") {
				ary.push(prop);
			}
		}

	}

	var getNumKeys = function(ary, obj) {
		for ( var prop in obj) {
			if (obj[prop] == "Two numbers" || obj[prop] == "Three numbers") {
				ary.push(prop);
			}
		}

	}

	var showAll = function($scope) {
		$scope.M5.vis.visFactors = true;
		$scope.M5.vis.visPandL = true;
		$scope.M5.vis.visWordMath = true;
		$scope.M5.vis.visVib = true;
		$scope.M5.vis.visLcmGcf = true;
		$scope.M5.vis.visVarRep = true;
		$scope.M5.vis.visVarEqn = true;
		$scope.M5.vis.visFraDec = true;
	}

	var hideAll = function($scope) {
		// Hide all
		$scope.M5.vis.visFactors = false;
		$scope.M5.vis.visPandL = false;
		$scope.M5.vis.visWordMath = false;
		$scope.M5.vis.visVib = false;
		$scope.M5.vis.visLcmGcf = false;
		$scope.M5.vis.visVarRep = false;
		$scope.M5.vis.visVarEqn = false;
		$scope.M5.vis.visFraDec = false;

	}

	var getNameSex = function(l) {
		var n = (l == 'mr')
				? names_mr[uGetRandomInt(0, names_mr.length - 1)]
				: names_en[uGetRandomInt(0, names_en.length - 1)];
		return n
	}

	var getThing = function(l) {
		var t = (l == 'mr')
				? things_mr[uGetRandomInt(0, things_mr.length - 1)]
				: things_en[uGetRandomInt(0, things_en.length - 1)];
		return t
	}

	function testPromise() {
		var p = Promise.resolve(21);

		p.then(function(v) {
			console.log(v); //	21
			//	create	a	promise	to	return
			return new Promise(function(resolve, reject) {
				//	introduce	asynchrony!
				setTimeout(function() {
					//	fulfill	with	value	`42`
					resolve(v * 2);
				}, 5000);
			});
		}).then(function(v) {
			//	runs	after	the	5s	delay	in	the	previous	step
			console.log(v); //	42
		});

		uLog('Exiting testPromise');

	}

	var oPublic = {
		getSimpleHardKeys : getSimpleHardKeys,
		getDigitsKeys : getDigitsKeys,
		getNumKeys : getNumKeys,
		showAll : showAll,
		hideAll : hideAll,
		getNameSex : getNameSex,
		getThing : getThing,
		testPromise : testPromise
	}

	return oPublic;

}();
