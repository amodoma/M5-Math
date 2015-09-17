M5Services

.factory('FactorsSer', ['$rootScope', 'ScoreSer', 'SetupSumSer', 'LogSer',
		'TimerSer',
		function($rootScope, ScoreSer, SetupSumSer, LogSer, TimerSer) {

			// Timer promise for new problem
			var prInterval = null;
			var num = -1, wrongAns, rightAns;
			var rightIndex;
			var rightAnsMul
			var self = this;

			function start() {
				num = M5.factors.compute();
				uLog('Computed new number=' + num);

				// Spoof answer
				wrongAns = M5.factors.spoof();

				// Right answer
				rightAns = M5.factors.ans();

				rightAnsMul = rightAns.toString().replace(/,/g, "x");

				SetupSumSer.setupUi(num.toString(), wrongAns, rightAnsMul);
				LogSer.init(num.toString(), rightAnsMul, wrongAns);

				// Single shot timer start
				var promise = TimerSer.start();
				promise.then(
				//Fullfillment
				function() {

					// -1 indicates timeout
					ScoreSer.ansClick(-1);
					ScoreSer.update();

					TimerSer.stop();
					// Recursive call
					start();
				}, function() {
					uLog('oops..promise rejected..')
				});
			}

			return {

				start : start,

				max : function(i) {
					M5.factors.max(i);

				},
				getMax : function() {
					return M5.factors.getMax();
				}
			};
		}]);
