var M5 = M5 || {};

M5Services
		.factory(
				'LayoutSer',
				[
						'$rootScope',
						'FontSer',
						function($rootScope, FontSer) {
							var htBar = 44;// because I set it!
							var htTabs = 49;// because I know it
							var wH = window.innerHeight;
							var left = wH - (htBar + htTabs);
							var wW = window.innerWidth;

							var programBoxes = function() {
								programBoxM();
								var boxB = document.getElementById("idBoxB");
								var boxS = document.getElementById("idBoxS");
								if (boxB !== null)
									boxB.style.height = 0.25 * left + 'px';

								// Had to set this to 20%, as there was a slight overflow, since
								// we do not know precise heights of components.
								if (boxS !== null)
									boxS.style.height = 0.2 * left + 'px';

							}

							var programBoxWorking = function() {
								// Program in the font size that was calculated
								// when the lesson was started
								var boxM = document.getElementById("idBoxM");
								var boxMnumsWrap = document
										.getElementById("idBoxNumsWrap");
								var boxMnums = document
										.getElementById("idBoxNums");

								var fontSz = FontSer.get();
								if (boxM !== null) {
									boxM.style.height = 0.5 * left + 'px';
									boxM.style.fontSize = fontSz + 'px';

									boxMnums.style.height = 0.5 * left + 'px';
									boxMnums.style.fontSize = fontSz + 'px';

									if ($rootScope.settings.enFitText) {
										uLog('Programming text-align center');
										boxM.style['line-height'] = 0.5 * left
												+ 'px';
										boxM.style['text-align'] = 'center';

										boxMnumsWrap.style['line-height'] = 0.5
												* left + 'px';
										boxMnumsWrap.style['text-align'] = 'center';
										boxMnumsWrap.style['margin-top'] = (-fontSz / 2)
												+ 'px';

									} else {
										uLog('Programming text-align left');
										boxM.style['line-height'] = fontSz
												+ 'px';
										boxM.style['text-align'] = 'left';

										boxMnumsWrap.style['line-height'] = fontSz
												+ 'px';
										boxMnumsWrap.style['text-align'] = 'left';
										boxMnumsWrap.style['margin-top'] = '0px';

									}
								}

							}

							var programBoxM = function() {
								// Program in the font size that was calculated
								// when the lesson was started
								var boxM = document.getElementById("idBoxM");
								var boxMnumsWrap = document
										.getElementById("idBoxNumsWrap");
								var boxMnums = document
										.getElementById("idBoxNums");

								var fontSz = FontSer.get();
								if (boxM !== null) {
									boxM.style.height = 0.5 * left + 'px';
									boxM.style.fontSize = fontSz + 'px';

									//boxMnums.style.height = 0.5 * left + 'px';
									boxMnums.style.fontSize = fontSz + 'px';

									if ($rootScope.settings.enFitText) {
										uLog('Programming text-align center');
										boxM.style['line-height'] = 0.5 * left
												+ 'px';
										boxM.style['text-align'] = 'center';

										boxMnumsWrap.style['line-height'] = 0.5
												* left + 'px';
										boxMnumsWrap.style['text-align'] = 'center';

										// Need to reset as it might have come from previous
										// wordy problem
										boxMnumsWrap.style['top'] = '0%';
										boxMnumsWrap.style['margin-top'] = '0px';

									} else {
										uLog('Programming text-align left');
										boxM.style['line-height'] = fontSz
												+ 'px';
										boxM.style['text-align'] = 'left';

										boxMnumsWrap.style['line-height'] = fontSz
												+ 'px';
										boxMnumsWrap.style['text-align'] = 'left';
										boxMnumsWrap.style['top'] = '50%';
										boxMnumsWrap.style['margin-top'] = (-calcDivHt() / 2)
												+ 'px';

									}
								}

							}



							function calcDivHt() {
								var div = document.createElement('div');
								// Reducing by 20 to account the margin of cards
								div.width = (wW - 20) + 'px';
								div.style['padding'] = '0px';
								div.style['border'] = '0px';
								div.style['margin'] = '0px';
								div.style['font-size'] = FontSer.get() + 'px';
								div.innerHTML = 'Karishma has 99936 balls. Karishma got 63 items every minute over the next 4 hrs. How many total items does Karishma have in the end?';
								document.body.appendChild(div);
								var ht = div.clientHeight;
								document.body.removeChild(div);
								uLog('div ht =' + ht);

								return ht;
							}

							return {
								programBoxes : programBoxes,
								programBoxM : programBoxM

							}

						}]);
