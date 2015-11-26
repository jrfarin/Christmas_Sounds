var app = angular.module('noelSounds', ['ionic']);


app.controller('NoelSoundsCtrl', function ($scope, $window) {

	$scope.media = null;

	$scope.model = {
		showDelete: false,
		showMove: false,
		sounds: [
			{
                'title': 'Silent Night',
                'description': 'Uno de los más famosos villancicos',
                'img': 'img/santa.png'
            },
            {
                'title': 'Ave María',
                'description': 'El clásico de Franz Schubert',
                'img': 'img/jingle.png'
            },
            {
                'title': 'White Christmas',
                'description': 'Navidades blancas',
                'img': 'img/crown.png'
            },
            {
                'title': 'Holly Night',
                'description': 'Como Silence Night versión sagrada',
                'img': 'img/tree.png'
            }    
		]
	};
    
    $scope.deleteSound = function($index){
        $scope.model.sounds.splice($index, 1);
    };
    
    $scope.moveSound = function(sound, $fromIndex, $toIndex) {
        $scope.model.sounds.splice($fromIndex, 1);
        $scope.model.sounds.splice($toIndex, 0, sound);
    };

	$scope.play = function(sound) {
        
        if ($scope.media) {
            $scope.media.pause();
        }
        
        if ($window.cordova) {
            console.log("Play called on device");
            ionic.Platform.ready(function() {
                
                var src = sound.file;
                if (ionic.Platform.is('android')) {
                    src = '/android_asset/www' + src;
                }
                $scope.media = new $window.Media(src);
                $scope.media.play();
            });
            
        } else {
            $scope.media = new Audio();
            $scope.media.src = sound.file;
            $scope.media.load();
            $scope.media.play();
        };     
    };
    // End $scope.play  
});
// End Controller


app.run(function ($ionicPlatform) {
	$ionicPlatform.ready(function () {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
			StatusBar.styleDefault();
		}
	});
});








