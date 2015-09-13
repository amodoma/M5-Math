var M5 = M5 || {};

angular
		.module('starter.controllers', [])

		.controller(
				'MathCtrl',
				[
						'$scope',
						'$rootScope',
						'FactorsService',
						'VibService',
						'LcmGcfService',
						'WordMathService',
						'PandLService',
						function($scope, $rootScope, FactorsService,
								VibService, LcmGcfService, WordMathService,
								PandLService) {
							console.log('In MathCtrl');

							$scope.ansClick = function(i) {
								if ($rootScope.settings.enableFactors)
									FactorsService.ansClick(i);
								else if ($rootScope.settings.enableVib)
									VibService.ansClick(i);
								else if ($rootScope.settings.enableGcf)
									LcmGcfService.ansClick(i);
								else if ($rootScope.settings.enableLcm)
									LcmGcfService.ansClick(i);
								else if ($rootScope.settings.enableLcm)
									LcmGcfService.ansClick(i);
								else if ($rootScope.settings.enableWordMath)
									WordMathService.ansClick(i);
								else if ($rootScope.settings.enablePandL)
									PandLService.ansClick(i);
								else
									throw new Error('Unknown lesson!');

							}

							$scope.sumSize = function() {

								var size = {
									sumXXSm : false,
									sumXSm : false,
									sumSm : false,
									sumLg : false
								};

								if ($rootScope.settings.enableFactors
										|| $rootScope.settings.enableVib) {
									if ($rootScope.maxInt == 9999)
										size.sumSm = true;
									else
										size.sumLg = true;
								}

								if ($rootScope.settings.enableLcm
										|| $rootScope.settings.enableGcf) {
									if (LcmGcfService.getMax() == 2)
										size.sumSm = true;
									else
										size.sumXSm = true;

								}

								if ($rootScope.settings.enableWordMath
										|| $rootScope.settings.enablePandL) {
									size.sumXXSm = true;
								}

								return size;
							}
						}])

		.controller(
				'SettingsCtrl',
				[
						'$scope',
						'$rootScope',
						'$translate',
						'FactorsService',
						'VibService',
						'LcmGcfService',
						'WordMathService',
						'LogService',
						'$ionicPopover',
						'$ionicScrollDelegate',
						'PandLService',
						'LangSer',
						function($scope, $rootScope, $translate,
								FactorsService, VibService, LcmGcfService,
								WordMathService, LogService, $ionicPopover,
								$ionicScrollDelegate, PandLService, LangSer) {
							var self = this;

							//======================================
							// Common

							// Language selection
							$scope.toggleLang = function() {
								var lang = $scope.M5.lang;
								uLog('lang = ' + lang);
								LangSer.setLang(lang);
								(lang == "mr")
										? $translate.use('mr')
										: $translate.use('en');

							}

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
							LogService.init($scope);
							$scope.logClick = function($event) {
								var s = LogService.get().toString();
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

							}

							// Visibility
							$scope.M5.vis = {
								visFactors : true,
								visVib : true,
								visLcmGcf : true,
								visWordMath : true,
								visPandL : true
							}

							$rootScope.settings = {
								enableFactors : false,
								enableVib : false,
								startLcmGcf : false,
								enableLcm : false,
								enableGcf : false,
								enableWordMath : false,
								enablePandL : false,
								choiceFactors : "Three",
								timeExpiry : 60 * 5
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
							}

							$scope.togglePandLEn = function() {
								var start = $rootScope.settings.enablePandL;
								uLog('PandL Start toggled -' + start);

								start ? startExec() : stopExec();

								function startExec() {
									PandLService.resetScore();
									PandLService.start();
									// Hide other lessons
									M5.routines.hideAll($scope);
									$scope.M5.vis.visPandL = true;

									// Insurance, in case user had clicked on LCM-GCF and started a different lesson
									LcmGcfService.resetEnables($scope);
								}

								function stopExec() {
									uLog('In stopExec');
									PandLService.stop();
									M5.routines.showAll($scope);

								}
							}

							//======================================
							// Word problem
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

							}

							$scope.toggleWordMathEn = function() {
								var start = $rootScope.settings.enableWordMath;
								uLog('Word Math Start toggled -' + start);

								start ? startExec() : stopExec();

								function startExec() {
									WordMathService.start();
									// Hide other lessons
									M5.routines.hideAll($scope);
									$scope.M5.vis.visWordMath = true;

									// Insurance, in case user had clicked on LCM-GCF and started a different lesson
									LcmGcfService.resetEnables($scope);
								}

								function stopExec() {

									WordMathService.stop();
									M5.routines.showAll($scope);

								}
							}

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
										LcmGcfService.max(2);
										break;
									case "three_num" :
										$rootScope.quantityLcmGcf = 3;
										LcmGcfService.max(3);
										break;
									default :
										throw new Error(
												'Oops..unknown value selected');
								}

							}

							$scope.evtNumOptChg = function() {
								self.evtNumOptChg();
							}

							self.evtNumOptChg();

							$scope.toggleEnLcm = function() {
								var flag = $rootScope.settings.enableLcm;

								enDisStart(flag);
								uLog('LCM toggled -' + flag);
							}

							$scope.toggleEnGcf = function() {
								var flag = $rootScope.settings.enableGcf;

								enDisStart(flag);
								uLog('GCF toggled -' + flag);

							}

							function enDisStart(flag) {

								(flag)
										? $scope.isDisabled = false
										: $scope.isDisabled = true;

							}

							$scope.toggleStartLcmGcf = function() {
								var start = $rootScope.settings.startLcmGcf;
								uLog('Start LCM-GCF service-' + start);
								if (start) {
									LcmGcfService.start();
									// Hide other lessons
									M5.routines.hideAll($scope);
									$scope.M5.vis.visLcmGcf = true;
								} else {
									LcmGcfService.stop();
									M5.routines.showAll($scope);
								}

							}

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
										VibService.max(99);
										break;
									case "three_dig" :
										$rootScope.maxInt = 999;
										VibService.max(999);
										break;
									case "four_dig" :
										$rootScope.maxInt = 9999;
										VibService.max(9999);
										break;
									default :
										throw new Error(
												'Oops..unknown value selected');
								}

							}

							$scope.evtVibOptChg = function() {
								self.evtVibOptChg();
							}

							self.evtVibOptChg();

							$scope.toggleVib = function() {
								var enSwitch = $rootScope.settings.enableVib;

								// Start/stop new problem

								if (enSwitch) {
									VibService.resetScore();
									VibService.start(true);
									// Hide other lessons
									M5.routines.hideAll($scope);

									// Insurance, in case user had clicked on LCM-GCF and started a different lesson
									LcmGcfService.resetEnables($scope);

									$scope.M5.vis.visVib = true;
									$ionicScrollDelegate.$getByHandle(
											'mainScroll').scrollTop();
								} else {
									VibService.stop();
									M5.routines.showAll($scope);
								}
							}

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
										FactorsService.max(99);
										break;
									case "three_dig" :
										$rootScope.maxInt = 99;
										FactorsService.max(999);
										break;
									case "four_dig" :
										$rootScope.maxInt = 9999;
										FactorsService.max(9999);
										break;
									default :
										throw new Error(
												'Oops..unknown value selected');
								}

							}

							$scope.evtPfOptChg = function() {
								self.evtPfOptChg();
							}

							self.evtPfOptChg();

							$scope.toggleFactors = function() {
								var enSwitch = $rootScope.settings.enableFactors;
								uLog('Factorization toggled!' + enSwitch);

								// Start/stop new problem
								var timeOut = $rootScope.settings.timeExpiry;
								uLog('timeout=' + timeOut);

								if (enSwitch) {
									FactorsService.resetScore();
									FactorsService.start(true);

									// Hide other lessons
									M5.routines.hideAll($scope);

									// Insurance, in case user had clicked on LCM-GCF and started a different lesson
									LcmGcfService.resetEnables($scope);
									$scope.M5.vis.visFactors = true;

									// Without this, the screen would look blank,
									// as we have scrolled at the bottom of list,
									// and then hidden certain items.
									$ionicScrollDelegate.$getByHandle(
											'mainScroll').scrollTop();
								} else {
									FactorsService.stop();
									// Show other lessons
									M5.routines.showAll($scope);
								}

							}

							$scope.toggleChoiceFactors = function() {

								console.log('Choice Factorization toggled!'
										+ $scope.settings.choiceFactors);

							}

						}]);
