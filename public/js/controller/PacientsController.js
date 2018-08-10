/* global app */

myApp.controller('PacientsController', function ($scope, $rootScope,Pacients,$window) {
  $scope.patient ={};
  $scope.listview = true;
  $scope.selectedoperations=[];
  $scope.patientopp = [];

  $scope.getall = function(){
    $rootScope.startblockui();
    Pacients.all({}, function (data) {
      $scope.patients = data.patients;
      $scope.operations = data.operations;
      $('#myDatepicker2').datetimepicker({
        format: 'YYYY-MM-DD'
      });
      $rootScope.stopblockui();
      $rootScope.datatable();
    }, function (err) {
      console.log(err);
      $rootScope.stopblockui();
    });
  }

  $scope.addpatient = function(){
    $scope.listview = false;
    $scope.patient ={};
    $scope.visit.operations =[];
  }

  $scope.deletepatient = function(patientid){
    $rootScope.startblockui();
    Pacients.deletepat({id:patientid}, function (data) {
      if(data.status =="success"){
        $scope.getall();
        $rootScope.toastalert('Patient Deleted','success');
        $rootScope.stopblockui();
      }
    }, function (err) {
      console.log(err);
      $rootScope.stopblockui();
    });
  }
  $scope.back =function(){
    $('#home-tab').click();
    $scope.listview = true;
    $scope.patient ={};
    $("#myDatepicker2").val('');
  }
  $scope.edit = function(item){
    $scope.selectedoperations = [];
    $scope.patientopp = [];
    $( '.tootho a' ).css('background','none');
    $( '.tootho a' ).css('color','black');
    $scope.pathimages = [];
    $scope.patient = JSON.parse(JSON.stringify(item));
    $scope.patient.operations_id = [];
    if(angular.isUndefined($scope.patient.tooth))
      $scope.patient.tooth =[];
    var patientopp = _.groupBy( $scope.patient.operations, 'visit_id');
    $.each(patientopp,function(index,value){
      var tooop = _.map(value,"operation_id");
      var toothinvoke = _.invokeMap(tooop, String.prototype.split, ',');
      var toothinvoke = _.flatten(toothinvoke);
      var opname =[];
      $.each(toothinvoke,function(index,value1){
       var id = $scope.operations.findIndex(x => x.id == value1);
       if(id > -1){
         opname.push($scope.operations[id].name);
       }

     });
      var obj = {
        date : value[0].created_at,
        opst:opname
      }
      $scope.patientopp.push(obj);
    });
    var tooth = _.groupBy( $scope.patient.tooth, 'title');
    $scope.toothoperations = [];
    $.each(tooth,function(index,value){
      var tooop = _.map(value,"operations_id");
      var toothinvoke = _.invokeMap(tooop, String.prototype.split, ',');
      var toothinvoke = _.flatten(toothinvoke);
      var obj = {
        title : value[0].title,
        opst:toothinvoke
      }
      $scope.toothoperations.push(obj);
    });
    _.forEach($scope.toothoperations, function(value, key) {
      if(value.opst.length > 0 && value.opst!=null && value.opst!=''){
        var ops= value.opst;
        var somme = 0;
        var color = '';
        var operationnames ='';
        if(ops.length > 1){
          $.each(ops,function(index,value1){
           var id = $scope.operations.findIndex(x => x.id == value1);
           if(id > -1){
             var colstr = ($scope.operations[id].color).replace('#','');
             somme += parseInt(colstr,16);
             operationnames += $scope.operations[id].name+' , ';
           }

         });
          var color = somme.toString(16);
        }
        if(ops.length == 1){
         var id = $scope.operations.findIndex(x => x.id == ops[0]);
         if(id > -1){
           var color = ($scope.operations[id].color).replace('#','');
           operationnames += $scope.operations[id].name;
         }
       }
       color = color.substring(0, 6);
       if(color.length < 6){
        var diff = 6 - color.length;
        for (var i = 0; i < diff; i++) {
          color +=i;
        }

      }
      var id1 = $scope.selectedoperations.findIndex(x => x.title == operationnames);

      if(id1 == -1){
        var objeect = {
          title: _.trim(operationnames, ' ,'),
          color: '#'+color,
        };
        $scope.selectedoperations.push(objeect);

      }
      $( '.tootho a[data-tooth= '+value.title+']' ).css('background','#'+color);
      $( '.tootho a[data-tooth= '+value.title+']' ).css('color','white');

    }
  });

    $.each($scope.patient.images ,function(index,value){
     $scope.pathimages.push(value.url);
   })
    $scope.listview = false;
  }
  $scope.submit = function(){
    if(angular.isUndefined($scope.patient.name) || $scope.patient.name==''){
      $("input[ng-model='patient.name']").addClass("redBorder");
      return false;
    }
    else{
     $rootScope.startblockui();
     $("input[ng-model='patient.name']").removeClass("redBorder");
     $scope.patient.dob= $("#myDatepicker2").val();
     Pacients.submit({data:$scope.patient}, function (data) {
       if(data.status =="OK"){
        $scope.patient.id = data.id;
        $scope.getall();
        $rootScope.toastalert('Success','success');
      }
      $rootScope.stopblockui();
    }, function (err) {
      $rootScope.toastalert('Please Try Again','danger');
      $rootScope.stopblockui();
      console.log(err);
    });
   }
 }
 $scope.redirecttovisit = function(id){
  $window.location.href = "#!/visits/"+id;

}


$scope.editfacture = function(id){
  $('#inv'+id).removeAttr('readonly');
  $('#invedit'+id).hide(500);
  $('#invsubmit'+id).show(500);
}

$scope.submitinv = function(id){
  var amount = $('#inv'+id).val();
  $rootScope.startblockui();
  Pacients.submitfacture({amount:amount,id:id}, function (data) {
   if(data.status =="OK"){
    $scope.getfactures($scope.patient.id);
    $rootScope.toastalert('Success','success');
  }
  $rootScope.stopblockui();
}, function (err) {
  $rootScope.toastalert('Please Try Again','danger');
  $rootScope.stopblockui();
  console.log(err);
});

}

$scope.addinv = function(){
  if(angular.isUndefined($scope.amountinvoice ) || $scope.amountinvoice ==''){
    $("input[ng-model='amountinvoice']").addClass("redBorder");
    return false;
  }
  else{
   $rootScope.startblockui();
   $("input[ng-model='amountinvoice']").removeClass("redBorder");
   Pacients.submitfacture({amount:$scope.amountinvoice,patienid: $scope.patient.id}, function (data) {
     if(data.status =="OK"){
       $scope.getfactures($scope.patient.id);
       $scope.amountinvoice = '';
       $rootScope.toastalert('Success','success');
     }
     $rootScope.stopblockui();
   }, function (err) {
    $rootScope.toastalert('Please Try Again','danger');
    $rootScope.stopblockui();
    console.log(err);
  });
 }
}


$scope.deletefacture = function(factureid){
  $rootScope.startblockui();
  Pacients.deletefacture({id:factureid}, function (data) {
    if(data.status =="success"){
      $scope.getfactures($scope.patient.id);
      $rootScope.toastalert('Factures Deleted','success');
      $rootScope.stopblockui();
    }
  }, function (err) {
    console.log(err);
    $rootScope.stopblockui();
  });
}

$scope.getfactures = function(patientid){
  $rootScope.startblockui();
  Pacients.getfactures({id:patientid}, function (data) {
    $scope.patient.factures = data.factures;
    
    $rootScope.stopblockui();
    
  }, function (err) {
    console.log(err);
    $rootScope.stopblockui();
  });
}

});