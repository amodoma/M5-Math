M5Services

.factory('VibSer', ['$rootScope', 'TimerSer', 'SetupSumSer', 'ScoreSer',
		'LogSer',
		function($rootScope, TimerSer, SetupSumSer, ScoreSer, LogSer) {

			// Timer promise for new problem
			var prInterval = null;
			var num = -1, wrongAns, rightAns;
			var rightIndex;
			var self = this;

			function start() {
				num = M5.vib.compute();
				uLog('Computed new number=' + num);

				// Spoof answer
				wrongAns = M5.vib.spoof();

				// Right answer
				rightAns = M5.vib.ans();

				SetupSumSer.setupUi(num.toString(), wrongAns, rightAns);
				LogSer.init(num.toString(), rightAns, wrongAns);

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
					M5.vib.max(i);

				},
				getMax : function() {
					return M5.vib.getMax();
				}

			};
		}]);
