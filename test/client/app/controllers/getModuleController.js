app.controller('getModuleController', function(Expert){
  var vm = this;
  vm.data = {};

  vm.data.questions = [];

  vm.addQuestion = function(){
    vm.data.questions.push({question: vm.selectedQuestion});
    vm.selectedQuestion = "";
  }

  vm.saveTest = function(){
    Expert.saveTest(vm.data).then(function(data){
      if(data.data.success){
        console.log('Succesful');
      }else{
        console.log('Error');
      }
    })
  }
})
