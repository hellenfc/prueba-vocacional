app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
  .state('home', {
    url:'/',
    templateUrl: 'app/pages/home.html'
  })
  .state('test', {
    url:'/test',
    templateUrl: 'app/pages/test.html',
    controller: 'testController',
    controllerAs: 'test'
  })
  .state('makeTest', {
    url:'/createTest',
    templateUrl: 'app/pages/insertTest.html',
    controller: 'getModuleController',
    controllerAs: 'get'
  })
  .state('login', {
    url:'/login',
    templateUrl: 'app/pages/login.html',
    controller: 'loginController',
    controllerAs: 'login'
  })
});
