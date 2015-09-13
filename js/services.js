var M5 = M5 || {};

var M5Services = angular.module('starter.services', []);
M5Services
		.factory(
				'WordMathService',
				[
						'TimerService',
						'SetupSumService',
						'ScoreService',
						'LogService',
						function(TimerService, SetupSumService, ScoreService,
								LogService) {

							var sum = '-1';
							var wrongAns = [];
							var rightAns = '-1';

							var total = 0, correctAns = 0;

							function start() {
								uLog('WordMAthService start');

								if (total == 0)
									ScoreService.updateScore(correctAns, total);

								newSum();

								SetupSumService
										.setupUi(sum, wrongAns, rightAns);

								var promise = TimerService.start();
								promise.then(
										//Fullfillment
										function() {
											total++;
											ScoreService.updateScore(
													correctAns, total);

											TimerService.stop();
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

							function stop() {
								TimerService.stop();
							}

							function ansClick(i) {
								if (SetupSumService.getRightIndex() == i) {
									uLog('Yipee correct!');
									correctAns++;
								} else {
									uLog('Darn....');
									LogService.log(sum, rightAns, wrongAns[i]);

								}

								total++;
								ScoreService.updateScore(correctAns, total);
								stop();
								start();
							}

							return {

								start : function() {
									total = 0;
									correctAns = 0;
									start();
								},
								stop : stop,
								ansClick : ansClick,

							}
						}])

		.factory('SetupSumService', ['$rootScope', function($rootScope) {

			var rightIndex = -1;

			function setupUi(sum, wrongAns, rightAns) {
				$rootScope.numIntRs = sum;
				$rootScope.ans0 = wrongAns[0];
				$rootScope.ans1 = wrongAns[1];
				$rootScope.ans2 = wrongAns[2];
				$rootScope.ans3 = wrongAns[3];

				rightIndex = uGetRandomInt(0, 3);

				switch (rightIndex) {
					case 0 :
						$rootScope.ans0 = rightAns;
						break;
					case 1 :
						$rootScope.ans1 = rightAns;
						break;
					case 2 :
						$rootScope.ans2 = rightAns;
						break;
					case 3 :
						$rootScope.ans3 = rightAns;
						break;
					default :
						throw new Error('Ouch incorrect index=' + rightIndex);

				}
			}

			return {
				setupUi : setupUi,
				getRightIndex : function() {
					return rightIndex;
				}
			}
		}])

		.factory(
				'TimerService',
				[
						'$interval',
						'$rootScope',
						'ScoreService',
						function($interval, $rootScope, ScoreService) {
							var prInterval = null;
							var total_start = 0;
							return {
								// Returns a promise. The resolution of the promise will start a new sum
								start : function() {
									total_start++;
									uLog('In Timerservice start:total_start='
											+ total_start);
									var timeOut = $rootScope.settings.timeExpiry * 1000;
									prInterval = $interval(function() {
										uLog('Timer expired!');
									}, timeOut, 1);
									return prInterval;

								},
								stop : function() {
									uLog('In Timerservice stop');
									if (angular.isDefined(prInterval)) {
										$interval.cancel(prInterval);
										prInterval = undefined;
										total_start = 0;
									}
								}

							}
						}])
		.factory('LogService', [function() {

			var dataLogger = [];

			function init($scope) {

				$scope.logErr = dataLogger;

			}

			function log(sum, right, user) {
				var s = sum + '(' + right + ',' + user + ')';
				dataLogger.push(s);
			}

			return {
				init : init,
				log : log,
				get : function() {
					return dataLogger
				}

			}

		}])
		.factory(
				'LcmGcfService',
				[
						'$interval',
						'$rootScope',
						'ScoreService',
						function($interval, $rootScope, ScoreService) {
							// Timer promise for new problem
							var prInterval = null;
							var num = [], wrongAns, rightAns;
							var total = -1, correctAns = 0;
							var rightIndex;
							var self = this;

							function newMathSum() {

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

								total++;

								setupUi();

							}

							function setupUi() {

								$rootScope.numIntRs = num[0] + ',' + num[1];
								$rootScope.ans0 = wrongAns[0];
								$rootScope.ans1 = wrongAns[1];
								$rootScope.ans2 = wrongAns[2];
								$rootScope.ans3 = wrongAns[3];

								rightIndex = uGetRandomInt(0, 3);

								switch (rightIndex) {
									case 0 :
										$rootScope.ans0 = rightAns;
										break;
									case 1 :
										$rootScope.ans1 = rightAns;
										break;
									case 2 :
										$rootScope.ans2 = rightAns;
										break;
									case 3 :
										$rootScope.ans3 = rightAns;
										break;
									default :
										throw new Error('Ouch incorrect index='
												+ rightIndex);

								}

								// As of last iteration, what is the score?
								ScoreService.updateScore(correctAns, total);

							}

							function ansClick(index) {
								if (rightIndex == index) {
									uLog('Yipee correct!');
									correctAns++;
								} else
									uLog('Darn....');

								ScoreService.updateScore(correctAns, total);
								stop();
								start();

							}

							function start() {
								if (uTruthy(prInterval) == false) {
									uLog('Starting timer');

									newMathSum();
									var timeOut = $rootScope.settings.timeExpiry * 1000;

									prInterval = $interval(newMathSum, timeOut);

								} else
									throw new Error(
											'Darn...timer is still alive...');

							}

							function stop() {
								uLog('In stop');
								if (angular.isDefined(prInterval)) {
									$interval.cancel(prInterval);
									prInterval = undefined;
								}
							}

							function resetEnables($scope) {
								$rootScope.settings.enableLcm = false;
								$rootScope.settings.enableGcf = false;
								$scope.isDisabled = true;
							}

							return {

								start : function() {
									start();
								},
								stop : function() {
									stop();
								},
								max : function(i) {
									M5.lcmgcf.max(i);

								},
								getMax : function() {
									return M5.lcmgcf.getMax();
								},
								//In case user turns on-off-on switch
								resetScore : function() {
									total = -1;
									correctAns = 0

								},
								ansClick : function(i) {
									ansClick(i);
								},
								resetEnables : resetEnables
							};
						}])
		.factory(
				'VibService',
				[
						'$interval',
						'$rootScope',
						'ScoreService',
						function($interval, $rootScope, ScoreService) {

							// Timer promise for new problem
							var prInterval = null;
							var num = -1, wrongAns, rightAns;
							var total = -1, correctAns = 0;
							var rightIndex;
							var self = this;

							function newMathSum() {
								num = M5.vib.compute();
								uLog('Computed new number=' + num);

								// Spoof answer
								wrongAns = M5.vib.spoof();

								// Right answer
								rightAns = M5.vib.ans();

								total++;

								setupUi();

							}

							function setupUi() {

								$rootScope.numIntRs = num;
								$rootScope.ans0 = wrongAns[0];
								$rootScope.ans1 = wrongAns[1];
								$rootScope.ans2 = wrongAns[2];
								$rootScope.ans3 = wrongAns[3];

								rightIndex = uGetRandomInt(0, 3);

								switch (rightIndex) {
									case 0 :
										$rootScope.ans0 = rightAns;
										break;
									case 1 :
										$rootScope.ans1 = rightAns;
										break;
									case 2 :
										$rootScope.ans2 = rightAns;
										break;
									case 3 :
										$rootScope.ans3 = rightAns;
										break;
									default :
										throw new Error('Ouch incorrect index='
												+ rightIndex);

								}

								// As of last iteration, what is the score?
								ScoreService.updateScore(correctAns, total);

							}

							function ansClick(index) {
								if (rightIndex == index) {
									uLog('Yipee correct!');
									correctAns++;
								} else
									uLog('Darn....');

								ScoreService.updateScore(correctAns, total);
								stop();
								start(false);

							}

							function start(viaEnable) {
								if (uTruthy(prInterval) == false) {
									uLog('Starting timer');

									if (viaEnable) {
										newNum();
									} else
										newMathSum();
									var timeOut = $rootScope.settings.timeExpiry * 1000;

									prInterval = $interval(newNum, timeOut);
									function newNum() {
										newMathSum();

									}
								} else
									throw new Error(
											'Darn...timer is still alive...');

							}

							function stop() {
								uLog('In stop');
								if (angular.isDefined(prInterval)) {
									$interval.cancel(prInterval);
									prInterval = undefined;
								}
							}

							return {

								start : function(viaEnable) {
									start(viaEnable);
								},
								stop : function() {
									stop();
								},
								max : function(i) {
									M5.vib.max(i);

								},
								getMax : function() {
									return M5.vib.getMax();
								},
								resetScore : function() {
									total = -1;
									correctAns = 0

								},
								ansClick : function(i) {
									ansClick(i);
								}
							};
						}])

		.factory(
				'FactorsService',
				[
						'$interval',
						'$rootScope',
						'ScoreService',
						function($interval, $rootScope, ScoreService) {

							// Timer promise for new problem
							var prInterval = null;
							var num = -1, wrongAns, rightAns;
							var total = -1, correctAns = 0;
							var rightIndex;
							var self = this;

							function newMathSum() {
								num = M5.factors.compute();
								uLog('Computed new number=' + num);

								// Spoof answer
								wrongAns = M5.factors.spoof();

								// Right answer
								rightAns = M5.factors.ans();

								total++;

								setupUi();

							}

							function setupUi() {

								uLog('In setupUi...');

								$rootScope.numIntRs = num;
								$rootScope.ans0 = wrongAns[0];
								$rootScope.ans1 = wrongAns[1];
								$rootScope.ans2 = wrongAns[2];
								$rootScope.ans3 = wrongAns[3];

								rightIndex = uGetRandomInt(0, 3);
								var rightAnxMul = rightAns.toString().replace(
										/,/g, "x");
								switch (rightIndex) {
									case 0 :
										$rootScope.ans0 = rightAnxMul;
										break;
									case 1 :
										$rootScope.ans1 = rightAnxMul;
										break;
									case 2 :
										$rootScope.ans2 = rightAnxMul;
										break;
									case 3 :
										$rootScope.ans3 = rightAnxMul;
										break;
									default :
										throw new Error('Ouch incorrect index='
												+ rightIndex);

								}

								// As of last iteration, what is the score?
								ScoreService.updateScore(correctAns, total);

							}

							function ansClick(index) {
								if (rightIndex == index) {
									uLog('Yipee correct!');
									correctAns++;
								} else
									uLog('Darn....');

								ScoreService.updateScore(correctAns, total);
								stop();
								start(false);

							}

							function start(viaEnable) {
								if (uTruthy(prInterval) == false) {
									uLog('Starting timer');

									if (viaEnable) {
										newNum();
									} else
										newMathSum();
									var timeOut = $rootScope.settings.timeExpiry * 1000;
									uLog('timeout=' + timeOut);
									prInterval = $interval(newNum, timeOut);
									function newNum() {
										newMathSum();

									}
								} else
									throw new Error(
											'Darn...timer is still alive...');

							}

							function stop() {
								uLog('In stop');
								if (angular.isDefined(prInterval)) {
									$interval.cancel(prInterval);
									prInterval = undefined;
								}
							}

							return {

								start : function(viaEnable) {
									start(viaEnable);
								},
								stop : function() {
									stop();
								},
								max : function(i) {
									M5.factors.max(i);

								},
								getMax : function() {
									return M5.factors.getMax();
								},
								resetScore : function() {
									total = -1;
									correctAns = 0

								},
								ansClick : function(i) {
									ansClick(i);
								}
							};
						}])
		.factory(
				'ScoreService',
				[
						'$rootScope',
						'LangSer',
						function($rootScope, LangSer) {

							return {
								updateScore : function(correctAns, total) {
									var percentScore = 100;
									var incorrectAns = total - correctAns;

									if (total != 0)
										percentScore = Math
												.floor((correctAns / total) * 100);

									var lang = LangSer.getLang();
									var scoreAbsStr = '';
									var scorePerStr = percentScore + '%';

									if (lang == 'en') {
										scoreAbsStr = '(Correct=' + correctAns
												+ ',Incorrect=' + incorrectAns
												+ ') Total=' + total;
									} else if (lang == 'mr') {
										scoreAbsStr = '(बरोबर=' + correctAns
												+ ',चुक=' + incorrectAns
												+ ') एकूण=' + total;
									} else
										throw new Error('Unknown lang');

									$rootScope.scoreAbs = scoreAbsStr;
									$rootScope.scorePercent = scorePerStr;

								}

							}
						}]);
