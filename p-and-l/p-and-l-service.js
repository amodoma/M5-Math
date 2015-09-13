var M5 = M5 || {};

M5Services.factory('PandLService', [
		'TimerService',
		'SetupSumService',
		'ScoreService',
		'LogService',
		'LangSer',
		function(TimerService, SetupSumService, ScoreService, LogService,
				LangSer) {

			var sum = '';
			var rName = null;
			var rSex = null;
			var rPronoun = null;
			var rThing = null;
			var rCostPrice = -1;
			var rSellPrice = -1;
			var sums = [];
			var op = ['+', '-'];
			var mLang = 'en';

			// Integers for scores
			var total = 0;
			var total_correct = 0;

			// Sum answer
			var sumAns = 0;
			var wrongAns = [];

			var start = function() {
				var pl;

				if (total == 0)
					ScoreService.updateScore(total_correct, total);
				compute();
				wrongAns = spoof();
				if (mLang == 'en')
					pl = rSellPrice > rCostPrice ? ' profit' : ' loss';
				else
					pl = rSellPrice > rCostPrice ? ' नफा' : ' तोटा';

				SetupSumService.setupUi(sum, wrongAns, sumAns + pl);

				// Single shot timer start
				var promise = TimerService.start();
				promise.then(
				//Fullfillment
				function() {
					total++;
					ScoreService.updateScore(total_correct, total);

					TimerService.stop();
					// Recursive call
					start();
				}, function() {
					uLog('oops..promise rejected..')
				});

			}

			function compute() {
				mLang = LangSer.getLang();
				uLog('compute getLang =' + mLang);

				sum = '';
				var selOp = op[uGetRandomInt(0, op.length - 1)];
				var nameSex = M5.routines.getNameSex(mLang);
				rName = nameSex[0];
				rSex = nameSex[1];
				if (mLang == 'en')
					rPronoun = (rSex == 'm') ? 'He' : 'She';
				else if (mLang == 'mr')
					rPronoun = (rSex == 'm') ? 'त्याने ' : 'तिने';
				else
					throw new Error('Unknown Lang');

				sum += rName;
				rThing = M5.routines.getThing(mLang);

				uLog('Sum =' + sum + ',thing=' + rThing);

				switch (selOp) {
					case op[0] :
						construct('profit');
						break;
					case op[1] :
						construct('loss');
						break;
					default :
						throw new Error('Unknown op selected!');
						break;

				}
				uLog('Sum=' + sum);
				return sum;

			}

			function construct(dir) {
				rCostPrice = uGetRandomInt(1, 99998);

				if (dir == 'profit')
					rSellPrice = uGetRandomInt(rCostPrice, 99999);
				else if (dir == 'loss')
					rSellPrice = uGetRandomInt(0, rCostPrice);
				else
					throw new Error('Unknown profit or loss');

				if (mLang == 'en')
					sum += ' bought ' + rThing + ' for Rs.' + rCostPrice + '. '
							+ rPronoun + ' sold it for Rs. ' + rSellPrice
							+ '. How much profit/loss did '
							+ rPronoun.toLowerCase() + ' make?';
				else if (mLang == 'mr')
					sum += ' ने ' + rThing + ' रुपये ' + rCostPrice
							+ 'ला विकत घेतले. ' + rPronoun + ' ' + rThing
							+ ' रुपये ' + rSellPrice + 'ला विकले. ' + rName
							+ 'चा किती नफा / तोटा झाला?';
				else
					throw new Error('Unknown lang');

				sumAns = Math.abs(rSellPrice - rCostPrice);

			}

			function spoof() {
				var setWrongAns = [];

				setWrongAns = [(sumAns + uGetRandomInt(1, 99)) + getRandPl(),
						(sumAns + uGetRandomInt(1, 99)) + getRandPl(),
						(sumAns + uGetRandomInt(1, 99)) + getRandPl(),
						(sumAns + uGetRandomInt(1, 99)) + getRandPl()];

				var len = setWrongAns.length;
				setWrongAns[uGetRandomInt(0, len - 1)] = sumAns
						+ getSmartRevPl();

				function getRandPl() {
					var pl;

					if (mLang == 'en')
						pl = uGetRandomInt(0, 1) ? ' profit' : ' loss';
					else
						pl = uGetRandomInt(0, 1) ? ' नफा' : ' तोटा';

					return pl;
				}

				function getSmartRevPl() {
					var pl;
					if (mLang == 'en')
						pl = rSellPrice <= rCostPrice ? ' profit' : ' loss';
					else
						pl = rSellPrice <= rCostPrice ? ' नफा' : ' तोटा';

					return pl;

				}
				return setWrongAns;

			}

			function ansClick(i) {
				uLog('In PandLansclick...');
				if (SetupSumService.getRightIndex() == i) {
					uLog('Yipee correct!');
					total_correct++;
				} else {
					uLog('Darn....');
					LogService.log(sum, sumAns, wrongAns[i]);

				}

				total++;
				ScoreService.updateScore(total_correct, total);
				stop();
				start();
			}

			function stop() {
				uLog('In Pand L stop');
				TimerService.stop();

			}

			return {
				start : start,
				stop : stop,
				ansClick : ansClick,
				resetScore : function() {
					total = 0;
					total_correct = 0;
				}
			}
		}]);
