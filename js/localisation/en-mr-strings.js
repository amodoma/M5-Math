var M5 = M5 || {};

M5.langStrings = function() {

	var getMrXlation = function() {
		return {
			language : "English",
			timeout : "वेळ(सेकेंड्स)",
			p_and_l : "नफा आणि तोटा",
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
			math_5 :"गाणित-इयत्ता पाचवी "
			}
	}

	var getEnXlation = function() {
		return {
			language : "मराठी",
			timeout : "Timeout(Seconds)",
			p_and_l : "Profit and loss",
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
			math_5:"Math-5th grade"
		}
	}
	var oPublic = {

		getMrXlation : getMrXlation,
		getEnXlation : getEnXlation

	}

	return oPublic;
}();