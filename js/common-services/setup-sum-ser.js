var M5 = M5 || {};

M5Services.factory('SetupSumSer', ['$rootScope', function($rootScope) {

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
