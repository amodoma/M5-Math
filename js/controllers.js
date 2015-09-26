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
						'VarRepSer',
						'VarEqnSer',
						'FraDecSer',
						'FontSer',
						'LayoutSer',
						function($scope, $rootScope, FactorsSer, VibSer,
								LcmGcfSer, WordMathSer, PandLSer, ScoreSer,
								TimerSer, VarRepSer, VarEqnSer, FraDecSer,
								FontSer, LayoutSer) {
							console.log('In MathCtrl');

							LayoutSer.programBoxes();


							//uDumpCssProp(idBoxM);

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
								else if ($rootScope.settings.enableWordMath)
									WordMathSer.start();
								else if ($rootScope.settings.enablePandL)
									PandLSer.start();
								else if ($rootScope.settings.enableVarRep)
									VarRepSer.start();
								else if ($rootScope.settings.enableVarEqn)
									VarEqnSer.start();
								else if ($rootScope.settings.enFraAdd)
									FraDecSer.start();
								else if ($rootScope.settings.enFraMul)
									FraDecSer.start();
								else if ($rootScope.settings.enDecAdd)
									FraDecSer.start();
								else if ($rootScope.settings.enDecMul)
									FraDecSer.start();
								else if ($rootScope.settings.enFra2Dec)
									FraDecSer.start();
								else if ($rootScope.settings.enDec2Fra)
									FraDecSer.start();
								else
									throw new Error('Unknown lesson!');

							};

							$scope.sumMax = function() {

								return 50;
							}

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
								var enVarRep = $rootScope.settings.enableVarRep;
								var enVarEqn = $rootScope.settings.enableVarEqn;
								var enFraAdd = $rootScope.settings.enFraAdd;
								var enFraMul = $rootScope.settings.enFraMul;
								var enDecAdd = $rootScope.settings.enDecAdd;
								var enDecMul = $rootScope.settings.enDecMul;
								var enFra2Dec = $rootScope.settings.enFra2Dec;
								var enDec2Fra = $rootScope.settings.enDec2Fra;
								var enFra = enFraAdd + enFraMul + enDecAdd
										+ enDecMul + enFra2Dec + enDec2Fra;
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

								if (enVarRep || enVarEqn || enFra || enWma
										|| enPnL)
									size.sumXXSm = true;
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
						'VarRepSer',
						'VarEqnSer',
						'FraDecSer',
						'FontSer',
						'LayoutSer',
						function($scope, $rootScope, $translate, FactorsSer,
								VibSer, LcmGcfSer, WordMathSer, LogSer,
								$ionicPopover, $ionicScrollDelegate, PandLSer,
								LangSer, TimerSer, ScoreSer, VarRepSer,
								VarEqnSer, FraDecSer, FontSer, LayoutSer) {
							var self = this;
							var fraSubLessons;

							//======================================
							// Common
							//uLog('Calling FontSer');

							function evalFitText() {
								$rootScope.settings.enFitText = $rootScope.settings.enableFactors
										|| $rootScope.settings.enableVib
										|| $rootScope.settings.enableLcm
										|| $rootScope.settings.enableGcf
										|| $rootScope.settings.enableVarEqn
										|| $rootScope.settings.enFraAdd
										|| $rootScope.settings.enFraMul
										|| $rootScope.settings.enDecAdd
										|| $rootScope.settings.enDecMul
										|| $rootScope.settings.enFra2Dec
										|| $rootScope.settings.enDec2Fra;

								uLog('evalFitText -'
										+ $rootScope.settings.enFitText);

								if ($rootScope.settings.enFitText)
									FontSer.calc(false);
								else
									FontSer.calc(true);

								LayoutSer.programBoxes();
							}
							// Invoked just before lesson begin
							var resetScoreLog = function() {
								LogSer.reset();
								ScoreSer.reset();
								ScoreSer.update();
							}

							// Language selection
							$scope.toggleLang = function() {
								var htBar = document.getElementById("idNavBar").offsetHeight;
								uLog('htBar=' + htBar);
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

							LogSer.bindDataLogger($scope);

							$scope.logClick = function($event) {
								var s = LogSer.get().toString();
								uLog('Log=' + s);

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
								visVarRep : true,
								visVarEqn : true,
								visFraDec : true
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
								enFraAdd : false,
								enFraMul : false,
								enDecAdd : false,
								enDecMul : false,
								enFra2Dec : false,
								enDec2Fra : false,
								choiceFactors : "Three",
								timeExpiry : 60 * 5,
								enFitText : false
							};

							//======================================
							// Decimal and fraction problems
							//
							$scope.isDisabledFraDec = true;

							var generateSubLessonO = function() {
								fraSubLessons = {
									kFraAdd : {
										en : $rootScope.settings.enFraAdd,
										setUi : function(flag) {
											$scope.isDisFraAdd = flag;
										}
									},
									kFraMul : {
										en : $rootScope.settings.enFraMul,
										setUi : function(flag) {
											$scope.isDisFraMul = flag;
										}
									},
									kDecAdd : {
										en : $rootScope.settings.enDecAdd,
										setUi : function(flag) {
											$scope.isDisDecAdd = flag;
										}
									},
									kDecMul : {
										en : $rootScope.settings.enDecMul,
										setUi : function(flag) {
											$scope.isDisDecMul = flag;
										}
									},
									kFra2Dec : {
										en : $rootScope.settings.enFra2Dec,
										setUi : function(flag) {
											$scope.isDisFra2Dec = flag;
										}
									},
									kDec2Fra : {
										en : $rootScope.settings.enDec2Fra,
										setUi : function(flag) {
											$scope.isDisDec2Fra = flag;
										}
									}
								};
							};

							// Enable toggle on fra sub-lessons at start
							// true = disables touch on the toggle
							// false = enables touch on the toggle
							//
							function enDisFraSubLessons(flag) {

								if (typeof flag !== "boolean")
									throw new Error('Boolean not passed in!');

								$scope.isDisFraAdd = flag;
								$scope.isDisFraMul = flag;
								$scope.isDisDecAdd = flag;
								$scope.isDisDecMul = flag;
								$scope.isDisFra2Dec = flag;
								$scope.isDisDec2Fra = flag;
							}

							enDisFraSubLessons(false);

							$scope.toggleFraSubLesson = function(flag) {
								var flagAllFraDisabled = false;

								enDisFraDecStart(flag);
								generateSubLessonO();

								for ( var l in fraSubLessons) {
									if (fraSubLessons[l].en)
										fraSubLessons[l].setUi(false);
									else
										fraSubLessons[l].setUi(true);

									flagAllFraDisabled |= fraSubLessons[l].en;
								}

								// If no sub lesson is enabled, enable all
								// sub lessons
								if (!flagAllFraDisabled)
									enDisFraSubLessons(false);
							}

							function enDisFraDecStart(flag) {
								$scope.isDisabledFraDec = !flag;
							}

							$scope.toggleStartFraDec = function() {
								evalFitText();
								var start = $rootScope.settings.startFraDec;
								uLog('Start FraDec service-' + start);
								if (start) {
									resetScoreLog();
									FraDecSer.start();
									// Hide other lessons
									M5.routines.hideAll($scope);
									$scope.M5.vis.visFraDec = true;

									// Disable toggle on sub-lessons
									enDisFraSubLessons(true);
								} else {
									TimerSer.stop();
									M5.routines.showAll($scope);

									// Enable toggle on sub-lesson
									// on the one that was started. Disable others.
									generateSubLessonO();

									for ( var l in fraSubLessons) {

										if (fraSubLessons[l].en)
											fraSubLessons[l].setUi(false);
										else
											fraSubLessons[l].setUi(true);

									}
								}

							};

							//======================================
							// Variable equation  problem
							//
							$scope.M5.vis.visVarEqn = true;
							var o_xlate = M5.langStrings.getEnXlation();

							// Get keys which are used in marathi translation
							$scope.varEqnCategoryOpt = [];
							M5.routines.getSimpleHardKeys(
									$scope.varEqnCategoryOpt, o_xlate);

							//$scope.varEqnCategoryOpt = ["simple", "hard"];
							$scope.evtVarEqn = function() {

								switch ($scope.M5.varEqnOpt) {
									case "simple" :
										uLog('Simple');
										VarEqnSer.hard(false);
										break;
									case "hard" :
										uLog('Hard');
										VarEqnSer.hard(true);
										break;
									default :
										throw new Error(
												'Oops..unknown value selected');
								}

							};

							$scope.M5.varEqnOpt = $scope.varEqnCategoryOpt[0];
							$scope.evtVarEqn();

							$scope.toggleVarEqnEn = function() {
								evalFitText();
								var enVarEqn = $rootScope.settings.enableVarEqn;
								if (enVarEqn)
									startExec();
								else
									stopExec();

								function startExec() {
									resetScoreLog();
									VarEqnSer.start();

									// Hide other lessons
									M5.routines.hideAll($scope);
									$scope.M5.vis.visVarEqn = true;

									// Insurance, in case user had clicked on LCM-GCF and started a different lesson
									LcmGcfSer.resetEnables($scope);
								}

								function stopExec() {
									TimerSer.stop();
									M5.routines.showAll($scope);

								}
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
							$scope.evtVarRep = function() {

								switch ($scope.M5.varRepOpt) {
									case "simple" :
										uLog('Simple');
										VarRepSer.hard(false);
										break;
									case "hard" :
										uLog('Hard');
										VarRepSer.hard(true);
										break;
									default :
										throw new Error(
												'Oops..unknown value selected');
								}

							};

							$scope.M5.varRepOpt = $scope.varRepCategoryOpt[0];
							$scope.evtVarRep();

							$scope.toggleVarRepEn = function() {
								evalFitText();
								var enVarRep = $rootScope.settings.enableVarRep;
								if (enVarRep)
									startExec();
								else
									stopExec();

								function startExec() {
									resetScoreLog();
									VarRepSer.start();

									// Hide other lessons
									M5.routines.hideAll($scope);
									$scope.M5.vis.visVarRep = true;

									// Insurance, in case user had clicked on LCM-GCF and started a different lesson
									LcmGcfSer.resetEnables($scope);
								}

								function stopExec() {
									TimerSer.stop();
									M5.routines.showAll($scope);

								}
							};

							//======================================
							// PandL problem
							//
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

								switch ($scope.M5.plOpt) {
									case "simple" :
										uLog('Simple');
										PandLSer.hard(false);
										break;
									case "hard" :
										uLog('Hard');
										PandLSer.hard(true);
										break;
									default :
										throw new Error(
												'Oops..unknown value selected');
								}
							};

							$scope.togglePandLEn = function() {
								evalFitText();
								var enPnL = $rootScope.settings.enablePandL;
								if (enPnL)
									startExec();
								else
									stopExec();

								function startExec() {
									resetScoreLog();
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
								evalFitText();
								var enWma = $rootScope.settings.enableWordMath;
								if (enWma)
									startExec();
								else
									stopExec();

								function startExec() {
									resetScoreLog();
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
								evalFitText();
								var start = $rootScope.settings.startLcmGcf;
								uLog('Start LCM-GCF service-' + start);
								if (start) {
									resetScoreLog();
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
								evalFitText();
								var enSwitch = $rootScope.settings.enableVib;

								// Start/stop new problem

								if (enSwitch) {
									resetScoreLog();
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
								evalFitText();
								var enSwitch = $rootScope.settings.enableFactors;
								uLog('Factorization toggled!' + enSwitch);

								// Start/stop new problem
								var timeOut = $rootScope.settings.timeExpiry;
								uLog('timeout=' + timeOut);

								if (enSwitch) {
									resetScoreLog();
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
