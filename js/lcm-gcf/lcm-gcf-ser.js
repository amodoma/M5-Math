M5Services.factory('LcmGcfSer', [
		'$rootScope',
		'ScoreSer',
		'SetupSumSer',
		'LogSer',
		'TimerSer',
		function($rootScope, ScoreSer,SetupSumSer,LogSer,TimerSer) {
			// Timer promise for new problem
			var prInterval = null;
			var num = [], wrongAns, rightAns;
			var rightIndex;
			var self = this;

			function start() {

				if ($rootScope.settings.enableLcm)
					num = M5.lcmgcf.computeLcm();
				else if ($rootScope.settings.enableGcf)
					num = M5.lcmgcf.computeGcf();
				else
					throw new Error(
							'Need to have atleast one of lcm or gcf enabled!')

				uLog('Computed new number=' + num.toString());

				// Spoof answer
				wrongAns = M5.lcmgcf.spoof();

				// Right answer
				rightAns = M5.lcmgcf.ans();

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

			function resetEnables($scope) {
				$rootScope.settings.enableLcm = false;
				$rootScope.settings.enableGcf = false;
				$scope.isDisabled = true;
			}

			return {

				start : start,

				max : function(i) {
					M5.lcmgcf.max(i);

				},
				getMax : function() {
					return M5.lcmgcf.getMax();
				},
				resetEnables : resetEnables
			};
		}]);
