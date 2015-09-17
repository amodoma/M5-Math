var M5 = M5 || {};

angular
		.module('starter.controllers', [])

		.controller(
				'MathCtrl',
				[
						'$scope',
						'$rootScope',
						'FactorsSer',
						'VibSer',
						'LcmGcfSer',
						'WordMathSer',
						'PandLSer',
						'ScoreSer',
						'TimerSer',
						function($scope, $rootScope, FactorsSer,
								VibSer, LcmGcfSer, WordMathSer,
								PandLSer, ScoreSer, TimerSer) {
							console.log('In MathCtrl');

							$scope.ansClick = function(i) {

								ScoreSer.ansClick(i);
								TimerSer.stop();
								if ($rootScope.settings.enableFactors)
									FactorsSer.start();
								else if ($rootScope.settings.enableVib)
									VibSer.start();
								else if ($rootScope.settings.enableGcf)
									LcmGcfSer.start();
								else if ($rootScope.settings.enableLcm)
									LcmGcfSer.start();
								else if ($rootScope.settings.enableLcm)
									LcmGcfSer.start();
								else if ($rootScope.settings.enableWordMath)
									WordMathSer.start();
								else if ($rootScope.settings.enablePandL)
									PandLSer.start();
								else
									throw new Error('Unknown lesson!');

							};

							$scope.sumSize = function() {

								var size = {
									sumXXSm : false,
									sumXSm : false,
									sumSm : false,
									sumLg : false
								};

								var enFac = $rootScope.settings.enableFactors;
								var enVib = $rootScope.settings.enableVib;
								var enLcm = $rootScope.settings.enableLcm;
								var enGcf = $rootScope.settings.enableGcf;
								var enWma = $rootScope.settings.enableWordMath;
								var enPnL = $rootScope.settings.enablePandL;

								if (enFac || enVib) {
									if ($rootScope.maxInt == 9999)
										size.sumSm = true;
									else
										size.sumLg = true;
								}

								if (enLcm || enGcf) {
									if (LcmGcfSer.getMax() == 2)
										size.sumSm = true;
									else
										size.sumXSm = true;

								}

								if (enWma || enPnL) {
									size.sumXXSm = true;
								}

								return size;
							};
						}])

		.controller(
				'SettingsCtrl',
				[
						'$scope',
						'$rootScope',
						'$translate',
						'FactorsSer',
						'VibSer',
						'LcmGcfSer',
						'WordMathSer',
						'LogSer',
						'$ionicPopover',
						'$ionicScrollDelegate',
						'PandLSer',
						'LangSer',
						'TimerSer',
						'ScoreSer',
						function($scope, $rootScope, $translate,
								FactorsSer, VibSer, LcmGcfSer,
								WordMathSer, LogSer, $ionicPopover,
								$ionicScrollDelegate, PandLSer, LangSer,
								TimerSer, ScoreSer) {
							var self = this;

							//======================================
							// Common

							// Language selection
							$scope.toggleLang = function() {
								var lang = $scope.M5.lang;
								uLog('lang = ' + lang);
								LangSer.setLang(lang);
								if (lang == "mr")
									$translate.use('mr');
								else
									$translate.use('en');

							};

							// Need to read this from local storage
							$scope.M5 = {};
							$scope.M5.lang = "en";

							$scope.getVisClass = function(enStatus) {
								return {
									lessonshow : enStatus,
									lessonhide : !enStatus
								};

							};

							// Send scope to bind with data logger
							LogSer.bindDataLogger($scope);
							$scope.logClick = function($event) {
								var s = LogSer.get().toString();
								uLog(s);
								//$scope.logErr = LogService.get().toString();

								$ionicPopover.fromTemplateUrl(
										'templates/log-popover.html', {
											scope : $scope
										}).then(function(popover) {
									$scope.popover = popover;
									$scope.popover.show($event);
								}, function() {
									uLog('Promise non-fullfillment');
								});

							};

							// Visibility
							$scope.M5.vis = {
								visFactors : true,
								visVib : true,
								visLcmGcf : true,
								visWordMath : true,
								visPandL : true,
								visVarRep : true
							};

							$rootScope.settings = {
								enableFactors : false,
								enableVib : false,
								startLcmGcf : false,
								enableLcm : false,
								enableGcf : false,
								enableWordMath : false,
								enablePandL : false,
								enableVarRep : false,
								choiceFactors : "Three",
								timeExpiry : 60 * 5
							};

							//======================================
							// Variable representation  problem
							//
							$scope.M5.vis.visVarRep = true;
							var o_xlate = M5.langStrings.getEnXlation();

							// Get keys which are used in marathi translation
							$scope.varRepCategoryOpt = [];
							M5.routines.getSimpleHardKeys(
									$scope.varRepCategoryOpt, o_xlate);

							//$scope.varRepCategoryOpt = ["simple", "hard"];
							$scope.M5.varRepOpt = $scope.varRepCategoryOpt[0];
							$scope.evtVarRep = function() {
								uLog('In evtVarRep-' + $scope.M5.varRepOpt);
							};

							$scope.toggleVarRepEn = function() {
								var enVarRep = $rootScope.settings.enableVarRep;
								if (enVarRep)
									startExec();
								else
									stopExec();

								function startExec() {
									VarRepService.resetScore();
									VarRepService.start();

									// Hide other lessons
									M5.routines.hideAll($scope);
									$scope.M5.vis.visVarRep = true;

									// Insurance, in case user had clicked on LCM-GCF and started a different lesson
									VarRepService.resetEnables($scope);
								}

								function stopExec() {
									uLog('In stopExec');
									VarRepService.stop();
									M5.routines.showAll($scope);

								}
							};

							//======================================
							// PandL problem
							$scope.M5.vis.visPandL = true;
							var o_xlate = M5.langStrings.getEnXlation();

							// Get keys which are used in marathi translation
							//$scope.plCategoryOpt = ["simple", "hard"];

							$scope.plCategoryOpt = [];
							M5.routines.getSimpleHardKeys($scope.plCategoryOpt,
									o_xlate);

							$scope.M5.plOpt = $scope.plCategoryOpt[0];
							$scope.evtPandL = function() {
								uLog('In evtPandL-' + $scope.M5.plOpt);
							};

							$scope.togglePandLEn = function() {
								var enPnL = $rootScope.settings.enablePandL;
								if (enPnL)
									startExec();
								else
									stopExec();

								function startExec() {
									ScoreSer.reset();
									ScoreSer.update();
									PandLSer.start();

									// Hide other lessons
									M5.routines.hideAll($scope);
									$scope.M5.vis.visPandL = true;

									// Insurance, in case user had clicked on LCM-GCF and started a different lesson
									LcmGcfSer.resetEnables($scope);
								}

								function stopExec() {
									uLog('In stopExec');
									TimerSer.stop();
									M5.routines.showAll($scope);

								}
							};

							//======================================
							// Word problem
							//
							$scope.wordCategoryOpt = [];
							M5.routines.getSimpleHardKeys(
									$scope.wordCategoryOpt, o_xlate);
							$scope.M5.wordOpt = $scope.wordCategoryOpt[0];
							$scope.evtWordCategory = function() {

								switch ($scope.M5.wordOpt) {
									case "simple" :
										uLog('Simple');
										break;
									case "hard" :
										uLog('Hard');
										break;
									default :
										throw new Error(
												'Oops..unknown value selected');
								}

							};

							$scope.toggleWordMathEn = function() {
								var enWma = $rootScope.settings.enableWordMath;
								if (enWma)
									startExec();
								else
									stopExec();

								function startExec() {
									ScoreSer.reset();
									ScoreSer.update();
									WordMathSer.start();

									// Hide other lessons
									M5.routines.hideAll($scope);
									$scope.M5.vis.visWordMath = true;

									// Insurance, in case user had clicked on LCM-GCF and started a different lesson
									LcmGcfSer.resetEnables($scope);
								}

								function stopExec() {

									TimerSer.stop();
									M5.routines.showAll($scope);

								}
							};

							//======================================
							// LCM-GCF options
							$scope.isDisabled = true;
							$scope.numCategoryOpt = [];
							M5.routines.getNumKeys($scope.numCategoryOpt,
									o_xlate);
							$scope.M5.numOpt = $scope.numCategoryOpt[0];
							self.evtNumOptChg = function() {
								switch ($scope.M5.numOpt) {
									case "two_num" :
										$rootScope.quantityLcmGcf = 2;
										LcmGcfSer.max(2);
										break;
									case "three_num" :
										$rootScope.quantityLcmGcf = 3;
										LcmGcfSer.max(3);
										break;
									default :
										throw new Error(
												'Oops..unknown value selected');
								}

							};

							$scope.evtNumOptChg = function() {
								self.evtNumOptChg();
							};

							self.evtNumOptChg();

							$scope.toggleEnLcm = function() {
								var flag = $rootScope.settings.enableLcm;

								enDisStart(flag);
								uLog('LCM toggled -' + flag);
							};

							$scope.toggleEnGcf = function() {
								var flag = $rootScope.settings.enableGcf;

								enDisStart(flag);
								uLog('GCF toggled -' + flag);

							};

							function enDisStart(flag) {

								if (flag)
									$scope.isDisabled = false;
								else
									$scope.isDisabled = true;

							}

							$scope.toggleStartLcmGcf = function() {
								var start = $rootScope.settings.startLcmGcf;
								uLog('Start LCM-GCF service-' + start);
								if (start) {
									ScoreSer.reset();
									ScoreSer.update();
									LcmGcfSer.start();
									// Hide other lessons
									M5.routines.hideAll($scope);
									$scope.M5.vis.visLcmGcf = true;
								} else {
									TimerSer.stop();
									M5.routines.showAll($scope);
								}

							};

							//======================================
							// Vibhajyat options
							$scope.vibCategoryOpt = [];
							M5.routines.getDigitsKeys($scope.vibCategoryOpt,
									o_xlate);
							$scope.M5.vibOpt = $scope.vibCategoryOpt[0];
							self.evtVibOptChg = function() {

								switch ($scope.M5.vibOpt) {
									case "two_dig" :
										$rootScope.maxInt = 99;
										VibSer.max(99);
										break;
									case "three_dig" :
										$rootScope.maxInt = 999;
										VibSer.max(999);
										break;
									case "four_dig" :
										$rootScope.maxInt = 9999;
										VibSer.max(9999);
										break;
									default :
										throw new Error(
												'Oops..unknown value selected');
								}

							};

							$scope.evtVibOptChg = function() {
								self.evtVibOptChg();
							};

							self.evtVibOptChg();

							$scope.toggleVib = function() {
								var enSwitch = $rootScope.settings.enableVib;

								// Start/stop new problem

								if (enSwitch) {
									ScoreSer.reset();
									ScoreSer.update();
									VibSer.start();
									// Hide other lessons
									M5.routines.hideAll($scope);

									// Insurance, in case user had clicked on LCM-GCF and started a different lesson
									LcmGcfSer.resetEnables($scope);

									$scope.M5.vis.visVib = true;
									$ionicScrollDelegate.$getByHandle(
											'mainScroll').scrollTop();
								} else {
									TimerSer.stop();
									M5.routines.showAll($scope);
								}
							};

							//======================================
							// Factorisation options
							$scope.pfCategoryOpt = [];
							M5.routines.getDigitsKeys($scope.pfCategoryOpt,
									o_xlate);
							$scope.M5.pfOpt = $scope.pfCategoryOpt[0];
							self.evtPfOptChg = function() {

								switch ($scope.M5.vibOpt) {
									case "two_dig" :
										$rootScope.maxInt = 99;
										FactorsSer.max(99);
										break;
									case "three_dig" :
										$rootScope.maxInt = 99;
										FactorsSer.max(999);
										break;
									case "four_dig" :
										$rootScope.maxInt = 9999;
										FactorsSer.max(9999);
										break;
									default :
										throw new Error(
												'Oops..unknown value selected');
								}

							};

							$scope.evtPfOptChg = function() {
								self.evtPfOptChg();
							};

							self.evtPfOptChg();

							$scope.toggleFactors = function() {
								var enSwitch = $rootScope.settings.enableFactors;
								uLog('Factorization toggled!' + enSwitch);

								// Start/stop new problem
								var timeOut = $rootScope.settings.timeExpiry;
								uLog('timeout=' + timeOut);

								if (enSwitch) {
									ScoreSer.reset();
									ScoreSer.update();
									FactorsSer.start(true);

									// Hide other lessons
									M5.routines.hideAll($scope);

									// Insurance, in case user had clicked on LCM-GCF and started a different lesson
									LcmGcfSer.resetEnables($scope);
									$scope.M5.vis.visFactors = true;

									// Without this, the screen would look blank,
									// as we have scrolled at the bottom of list,
									// and then hidden certain items.
									$ionicScrollDelegate.$getByHandle(
											'mainScroll').scrollTop();
								} else {
									TimerSer.stop();
									// Show other lessons
									M5.routines.showAll($scope);
								}

							};

							$scope.toggleChoiceFactors = function() {
								var choiceFac = $scope.settings.choiceFactors;
								uLog('Choice Fac toggled!' + choiceFac);

							};

						}]);
