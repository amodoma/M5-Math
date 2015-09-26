var M5 = M5 || {};

M5.langStrings = function() {

	var getMrXlation = function() {
		return {
			language : "English",
			timeout : "वेळ(सेकेंड्स)",
			var_rep : "चल शिकण",
			var_eqn : "चल समीकरण",
			p_and_l : "नफा आणि तोटा",
			buy : "घेतले",
			sell : "विकले",
			profit : "नफा",
			loss : "तोटा",
			start : "सुरवात",
			wordy : "वाक्य गाणित",
			lcm : "लसावी",
			gcf : "मसावी",
			quan : "आकडी",
			full_divide : "विभाज्या",
			prime_factors : "मूळ अवयव",
			simple : "सोप्य",
			hard : "आवघड",
			two_dig : "दोन अंकी",
			three_dig : "तीन अंकी",
			four_dig : "चार अंकी",
			two_num : "दोन आकडी",
			three_num : "तीन आकडी",
			math : "गाणित",
			settings : "सेटिंग्ज",
			math_5 : "गाणित-इयत्ता पाचवी ",
			fraadd : "अपूर्णांक बेरीज",
			framul : "अपूर्णांक गुणाकार",
			decadd : "दशांश बेरीज",
			decmul : "दशांश गुणाकार",
			fra2dec : "अपूर्णांक ते दशांश",
			dec2fra : "दशांश ते अपूर्णांक"
		}
	}

	var getEnXlation = function() {
		return {
			language : "मराठी",
			timeout : "Timeout(Seconds)",
			var_rep : "Variable representation",
			var_eqn : "Variable equations",
			p_and_l : "Profit and loss",
			buy : "Buy",
			sell : "Sell",
			profit : "Profit",
			loss : "Loss",
			start : "Start",
			wordy : "Word Math",
			lcm : "LCM",
			gcf : "GCF",
			quan : "Digits",
			full_divide : "Completely divisible",
			prime_factors : "Prime factorisation",
			simple : "Simple",
			hard : "Hard",
			two_dig : "Two digits",
			three_dig : "Three digits",
			four_dig : "Four digits",
			two_num : "Two numbers",
			three_num : "Three numbers",
			math : "Math",
			settings : "Settings",
			math_5 : "Math-5th grade",
			fraadd : "Fractions add",
			framul : "Fractions multiply",
			decadd : "Decimal add",
			decmul : "Decimal multiply",
			fra2dec : "Fractions to decimal",
			dec2fra : "Decimal to fraction"
		}
	}
	var oPublic = {

		getMrXlation : getMrXlation,
		getEnXlation : getEnXlation

	}

	return oPublic;
}();
