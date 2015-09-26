var M5 = M5 || {};

M5Services.factory('LogSer', [function() {

	var dataLogger = [];

	// Save sum data
	var sum = '';
	var right = '';
	var wrong;

	function init(s, r, w) {
		sum = s;
		right = r;
		wrong = w;
	}

	function bindDataLogger($scope) {
		if (typeof $scope.M5.logErr === "undefined")
			$scope.M5.logErr = dataLogger;

	}

	// Parameter passed in is the one user clicked
	function log(i) {
		var s = sum + '(' + right + ',' + wrong[i] + ')';
		dataLogger.push(s);
	}

	// Only array modification, and not creation. This will ensure that $scope.logErr
	// and dataLogger point to the same values. Modification, like dataLogger = []
	// will make them point to different values, as references behave differently
	// in Javascript compared to other languages. See Kyle Simpson pdf on this
	//
	function reset() {
		dataLogger.length = 0;
	}

	return {
		bindDataLogger : bindDataLogger,
		init : init,
		log : log,
		reset : reset,
		get : function() {
			return dataLogger
		}

	}

}]);
