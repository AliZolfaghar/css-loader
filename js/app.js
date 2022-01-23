var app = angular.module('app', ['ngRoute', 'ngCookies', 'oc.lazyLoad' , 'ADM-dateTimePicker']);

app.run(function () {
    console.log('app.run')
});


app.config(['$routeProvider', '$locationProvider', 'ADMdtpProvider',function ($routeProvider, $locationProvider, ADMdtp) {
    console.log('app.config');

    // setup date picker
    ADMdtp.setOptions({
        calType: 'jalali',
        format: 'YYYY/MM/DD - hh:mm',
        default: 'today',
        autoClose : true ,
        multiple : false,
    });


    // setup my app routes
    $routeProvider
        .when('/', {
            redirectTo: '/home'
        })

        .when('/home', {
            templateUrl: '/js/ngModules/home/home.html',
            controller: 'homeCtrl' , 
            resolve: {
                deps: function ($ocLazyLoad) {
                    return $ocLazyLoad.load("/js/ngModules/home/homeCtrl.js");
                }
            }

        })        

        .when('/about', {
            templateUrl: '/js/ngModules/about/about.html',
            controller: 'aboutCtrl',
            resolve: {
                deps: function ($ocLazyLoad) {
                    return $ocLazyLoad.load("/js/ngModules/about/aboutCtrl.js");
                }
            }
        })

        .when('/users/:userid?', {
            templateUrl: '/js/ngModules/users/users.html',
            controller: 'usersCtrl',
            resolve: {
                deps: function ($ocLazyLoad) {
                    return $ocLazyLoad.load("/js/ngModules/users/usersCtrl.js");
                }
            }
        })


        .otherwise({
            templateUrl: '/js/ngModules/404/404.html',
            controller: '404Ctrl' , 
            resolve: {
                deps: function ($ocLazyLoad) {
                    return $ocLazyLoad.load("/js/ngModules/404/404Ctrl.js");
                }
            }
        });
}]);


app.controller('mainCtrl',function($scope){
    console.log('main-controller');
    //the next code block will run on every route-change
    $scope.$on('$routeChangeStart', function(next, current){
        //...do stuff here to run on every route change ...
        console.log('route-change');
        // console.log('current',current); 
        // console.log('next',next);
        // put realname and rolename in $rootScope
        // svc.refreshUser();
    });

});// mainCtrl
