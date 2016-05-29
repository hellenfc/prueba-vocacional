app.factory('Expert', function($http, CONSTANT){
  var expertFactory = {};

  expertFactory.saveTest = function(data){
    return $http.post('/api/test', data);
  }

  return expertFactory;
})
