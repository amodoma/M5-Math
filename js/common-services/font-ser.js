var M5 = M5 || {};

M5Services.factory('FontSer', [function() {

	var wH = window.innerHeight;
	var wW = window.innerWidth;
	var can, ctx;
	var font_size;

	var calc = function(flagLot) {

		createOffscreenCanvas();
		uLog('Done with canvas creation');
		calcFontSize(flagLot);

	}

	var get = function() {
		return font_size;

	}

	function createOffscreenCanvas() {
		can = document.createElement('canvas');
		can.width = wW;
		can.height = wH / 2;
		ctx = can.getContext("2d");
	}

	function calcFontSize(flagLot) {
		// start with a large font size on a large string
		font_size = 100;
		var font_face = 'Sans-Serif';
		if (flagLot)
			text = 'abcdefghijklmnopqrstuvwxyz';
		else
			text = '5568 + 7789';

		// lower the font size until the text fits the canvas
		do {
			font_size--;
			ctx.font = font_size + "px " + font_face;
		} while (ctx.measureText(text).width > 0.8 * can.width);

		uAssertTrue(font_size > 0,
				'font-ser:font_size has to be greater than 0');

		uLog('calcFontSize:font_size=' + font_size);

	}

	return {
		calc : calc,
		get : get

	}

}]);
