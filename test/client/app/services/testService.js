app.factory('Test', function($http){
  var testFactory = {};
  testFactory.getTestById = function(id){
    return $http.get('/api/test/'+id);
  }
  testFactory.answer = function(answer){
    return $http.post('/api/answer/', {answer : answer});
  }
  return testFactory;
});
