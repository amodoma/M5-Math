var M5 = M5 || {};

M5Services.factory('PandLSer', [
		'TimerSer',
		'SetupSumSer',
		'ScoreSer',
		'LogSer',
		'LangSer',
		function(TimerSer, SetupSumSer, ScoreSer, LogSer, LangSer) {

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
			var flagHard = false;
			var mStrO;

			// Sum answer
			var sumAns = 0;
			var wrongAns = [];

			var hard = function(selOpt) {

				flagHard = selOpt;

			}

			var start = function() {
				var pl;

				if (flagHard) {
					computeH();
				} else {
					computeS();
				}

				wrongAns = spoof();

				if (mLang == 'en')
					pl = rSellPrice > rCostPrice ? ' profit' : ' loss';
				else
					pl = rSellPrice > rCostPrice ? ' नफा' : ' तोटा';
				SetupSumSer.setupUi(sum, wrongAns, sumAns + pl);
				LogSer.init(sum, sumAns + pl, wrongAns);

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

			function computeH() {
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
						constructH('profit');
						break;
					case op[1] :
						constructH('loss');
						break;
					default :
						throw new Error('Unknown op selected!');
						break;

				}
				uLog('Sum=' + sum);
				return sum;

			}

			function computeS() {
				var selOp;
				mLang = LangSer.getLang();
				uLog('compute getLang =' + mLang);

				sum = '';

				if (mLang == 'en')
					mStrO = M5.langStrings.getEnXlation();
				else if (mLang == 'mr')
					mStrO = M5.langStrings.getMrXlation();
				else
					throw new Error('Unknown Lang');

				selOp = op[uGetRandomInt(0, op.length - 1)];
				switch (selOp) {
					case op[0] :
						constructS('profit');
						break;
					case op[1] :
						constructS('loss');
						break;
					default :
						throw new Error('Unknown op selected!');
						break;

				}
				uLog('Sum=' + sum);
				return sum;

			}

			function constructS(dir) {
				rCostPrice = uGetRandomInt(1, 99998);

				if(uGetRandomInt(0,1))
					rCostPrice *= 100;

				if (dir == 'profit')
					rSellPrice = uGetRandomInt(rCostPrice, 99999);
				else if (dir == 'loss')
					rSellPrice = uGetRandomInt(0, rCostPrice);
				else
					throw new Error('Unknown profit or loss');

				sum += mStrO.buy +'  ' + rCostPrice;
				sum += ','
				sum += mStrO.sell +'  ' + rSellPrice;

				sumAns = Math.abs(rSellPrice - rCostPrice);

			}

			function constructH(dir) {
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

			return {
				start : start,
				hard : hard
			}
		}]);
