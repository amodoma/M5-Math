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

		$scope.logErr = dataLogger;

	}

    // Parameter passed in is the one user clicked
	function log(i) {
		var s = sum + '(' + right + ',' + wrong[i] + ')';
		dataLogger.push(s);
	}

	return {
		bindDataLogger : bindDataLogger,
		init : init,
		log : log,
		get : function() {
			return dataLogger
		}

	}

}]);
