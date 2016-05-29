app.controller('testController', function(Test){
  var vm = this;
  vm.answer = [];
  Test.getTestById('572035a53bfb31bc21223fd0').then(function(data){
    console.log(data);
    vm.test = data.data;
  });

  vm.showAnswer = function(){
    console.log(vm.answer);
    Test.answer(vm.answer).then(function(data){
      console.log(data);
    })
  }
});
