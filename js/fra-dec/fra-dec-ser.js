M5Services

.factory('FraDecSer', ['$rootScope', 'ScoreSer', 'SetupSumSer', 'LogSer',
		'TimerSer',
		function($rootScope, ScoreSer, SetupSumSer, LogSer, TimerSer) {

			// Timer promise for new problem
			var prInterval = null;
			var sum, wrongAns, rightAns;
			var rightIndex;
			var hardFlag = false;
			var self = this;

			function start() {
				M5.fradec.init($rootScope);

				sum = M5.fradec.compute($rootScope);

				// Spoof answer
				wrongAns = M5.fradec.spoof($rootScope);

				// Right answer
				rightAns = M5.fradec.ans();

				SetupSumSer.setupUi(sum, wrongAns, rightAns);
				LogSer.init(sum, rightAns, wrongAns);

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

				start : start

			};
		}]);
