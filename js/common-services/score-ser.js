var M5 = M5 || {};

M5Services.factory('ScoreSer', [
		'$rootScope',
		'LangSer',
		'SetupSumSer',
		'LogSer',
		function($rootScope, LangSer, SetupSumSer, LogSer) {
			var total = 0;
			var correct = 0;

			function update() {
				var percentScore = 100;
				var incorrect = total - correct;

				if (total != 0)
					percentScore = Math.floor((correct / total) * 100);

				var lang = LangSer.getLang();
				var scoreAbsStr = '';
				var scorePerStr = percentScore + '%';

				if (lang == 'en') {
					scoreAbsStr = '(Correct=' + correct + ',Incorrect='
							+ incorrect + ') Total=' + total;
				} else if (lang == 'mr') {
					scoreAbsStr = '(बरोबर=' + correct + ',चुक=' + incorrect
							+ ') एकूण=' + total;
				} else
					throw new Error('Unknown lang');

				$rootScope.scoreAbs = scoreAbsStr;
				$rootScope.scorePercent = scorePerStr;

			}

			function reset() {
				total = 0;
				correct = 0;
			}

			function ansClick(i) {
				uLog('In score-ser.js ansClick...');
				if (SetupSumSer.getRightIndex() == i) {
					uLog('Yipee correct!');
					correct++;
				} else {
					uLog('Darn....');
					LogSer.log(i);

				}

				total += 1;
				update();
			}

			return {
				update : update,
				reset : reset,
				ansClick : ansClick

			}
		}]);
