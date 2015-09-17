var M5 = M5 || {};

M5Services.factory('WordMathSer', ['TimerSer', 'SetupSumSer', 'ScoreSer',
		'LogSer', function(TimerSer, SetupSumSer, ScoreSer, LogSer) {

			var sum = '';
			var wrongAns = [];
			var rightAns = '';

			function start() {
				uLog('WordMAthSer start');

				newSum();

				SetupSumSer.setupUi(sum, wrongAns, rightAns);
				LogSer.init(sum, rightAns, wrongAns);

				var promise = TimerSer.start();
				promise.then(
				//Fullfillment
				function() {
				    ScoreSer.ansClick(-1);
					ScoreSer.update();

					TimerSer.stop();

					// Recursive call
					start();
				}, function() {
					uLog('oops..promise rejected..')
				});

			}

			function newSum() {
				sum = M5.wordMath.compute();

				wrongAns = M5.wordMath.spoof();

				rightAns = M5.wordMath.ans();

			}

			return {

				start : start

			}
		}]);
