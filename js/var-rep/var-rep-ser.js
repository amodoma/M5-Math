M5Services

.factory('VarRepSer', ['$rootScope', 'ScoreSer', 'SetupSumSer', 'LogSer',
		'TimerSer',
		function($rootScope, ScoreSer, SetupSumSer, LogSer, TimerSer) {

			// Timer promise for new problem
			var prInterval = null;
			var sum, wrongAns, rightAns;
			var rightIndex;
			var hardFlag = false;
			var self = this;

			function start() {
				sum = M5.varrep.compute(hardFlag);

				// Spoof answer
				wrongAns = M5.varrep.spoof();

				// Right answer
				rightAns = M5.varrep.ans();

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

			function hard(flag) {
				hardFlag = flag;
			}

			function isHard(){
			    return hardFlag;
			}

			return {

				start : start,
				hard : hard,
				isHard : isHard

			};
		}]);
