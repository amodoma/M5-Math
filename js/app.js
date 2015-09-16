// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module(
		'starter',
		['ionic', 'pascalprecht.translate', 'starter.controllers',
				'starter.services'])

.run(function($ionicPlatform, $translate) {
	$ionicPlatform.ready(function() {

		$translate.use("en").then(function(data) {
			console.log("SUCCESS -> " + data);
		}, function(error) {
			console.log("ERROR -> " + error);
		});

		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		var kb = window.cordova.plugins.Keyboard;
		if (window.cordova && window.cordova.plugins && kb) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);

			//navigator.splashscreen.hide();

		}

		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleLightContent();
		}
	});
})

.config(function($stateProvider, $urlRouterProvider, $translateProvider) {
	// Ionic uses AngularUI Router which uses the concept of states
	// Learn more here: https://github.com/angular-ui/ui-router
	// Set up the various states which the app can be in.
	// Each state's controller can be found in controllers.js
	$stateProvider

	// setup an abstract state for the tabs directive
	.state('tab', {
		url : '/tab',
		abstract : true,
		templateUrl : 'templates/tabs.html'
	})

	// Each tab has its own nav history stack:

	.state('tab.math', {
		url : '/math',
		views : {
			'tab-math' : {
				templateUrl : 'templates/tab-math.html',
				controller : 'MathCtrl'
			}
		}
	})

	.state('tab.settings', {
		url : '/settings',
		views : {
			'tab-settings' : {
				templateUrl : 'templates/tab-settings.html',
				controller : 'SettingsCtrl'
			}
		}
	});

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/tab/settings');

	// Localisation
	$translateProvider.translations('en', M5.langStrings.getEnXlation());
	$translateProvider.translations('mr', M5.langStrings.getMrXlation());
	$translateProvider.preferredLanguage("en");
	$translateProvider.fallbackLanguage("en");

});
