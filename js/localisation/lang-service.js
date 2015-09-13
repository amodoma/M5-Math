var M5 = M5 || {};

M5Services.factory('LangSer', [function() {
	var currentLang = 'en';

	var setLang = function(lang) {
		currentLang = lang;
	}

	var getLang = function() {
		return currentLang;
	}

	return {

		setLang : setLang,
		getLang : getLang
	}
}]);