var M5 = M5 || {};

M5Services.factory('TimerSer', ['$interval', '$rootScope',
		function($interval, $rootScope) {
			var prInterval = null;
			var total_start = 0;
			return {
				// Returns a promise. The resolution of the promise will start a new sum
				start : function() {
					total_start++;
					uLog('In TimerSer start:total_start=' + total_start);
					var timeOut = $rootScope.settings.timeExpiry * 1000;
					prInterval = $interval(function() {
						uLog('Timer expired!');
					}, timeOut, 1);
					return prInterval;

				},
				stop : function() {
					uLog('In TimerSer stop');
					if (angular.isDefined(prInterval)) {
						$interval.cancel(prInterval);
						prInterval = undefined;
						total_start = 0;
					}
				}

			}
		}]);
