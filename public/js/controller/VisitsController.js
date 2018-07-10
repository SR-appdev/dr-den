/* global app */
var myDropzone;
myApp.controller('VisitsController', function ($scope, $rootScope,Visits,$stateParams,$window,Pacients,$timeout) {
  $scope.patienid = $stateParams.patientid;
  $scope.visits ={};
  $scope.visit ={};
  $scope.tooth ={};
  $scope.pathimages = [];
  $scope.newpathimages = [];
  $scope.listview = true;
  $scope.patients = {};
  $scope.toothnote = false;
  $timeout( function(){
    myDropzone = new Dropzone("div.dropzone", { 
      url: "/upload/images",
      method: "POST",
      autoProcessQueue: false,
      maxFiles: 50,
      parallelUploads:50,
      addRemoveLinks:true,
      headers: {
        'X-CSRF-TOKEN': $('input[name="_token"]').val()
      },
    });
    myDropzone.on("success", function(event,data) {
     $scope.$apply(function () {
      $scope.pathimages.push(data.path);
      $scope.newpathimages.push(data.path);
    });
   });
    myDropzone.on("complete", function(event,data) {
     myDropzone.removeFile(event);
   });
    myDropzone.on("error", function(event,data) {
      $rootScope.toastalert('Some Images Not Uploaded','danger');
    });
    myDropzone.on("queuecomplete", function(event,data) {
     $scope.$apply(function () {
      $scope.submit();
    });
   });
  }, 500 );

  $scope.getall = function(){
    $rootScope.startblockui();
    Visits.all({id: $scope.patienid}, function (data) {
     $('#myDatepicker2').datetimepicker({
      format: 'YYYY-MM-DD'
    });


     $scope.visits = data.visits;
     $scope.operations = data.operations;
     $rootScope.stopblockui();
     $rootScope.datatable();
   }, function (err) {
    console.log(err);
    $rootScope.stopblockui();
  });
  }
  $scope.removeimages =function(){
    var files = myDropzone.getQueuedFiles();
    $.each(files ,function(index,value){
     myDropzone.removeFile(value);
   })
  }
  $scope.getallpatients = function(){
    Pacients.all({}, function (data) {
      $scope.patients = data.patients;
    }, function (err) {
      console.log(err);
    });
  }
  $scope.addvisit = function(){
   $scope.removeimages();
   $scope.newpathimages = [];
   $scope.listview = false;
   $scope.visit ={};
   $scope.visit.teeth =[];
   $scope.visit.total =0;
   $scope.visit.payment =0;
   $scope.pathimages = [];
 }

 $scope.edit = function(item){
  $scope.removeimages();
  $scope.newpathimages = [];
  $scope.pathimages = [];
  $('select').selectpicker('destroy');
  $scope.visit = JSON.parse(JSON.stringify(item));
  $scope.visit.operations_id = [];
  if(angular.isUndefined($scope.visit.teeth))
    $scope.visit.teeth =[];
  $.each($scope.visit.teeth,function(index,value){
    if(value.operations_id!=null && value.operations_id!=''){
      var ops= value.operations_id.split(",");
      console.log(ops[0]);
      console.log($scope.operations);
      var id = $scope.operations.findIndex(x => x.id == ops[0]);
      console.log(id);
      console.log($scope.operations[id])
      $('.'+value.title+'-parent').css('fill',$scope.operations[id].color);
    }
    else{
      $('.'+value.title+'-parent').addClass('redfill');
    }
    
  })
  $.each($scope.visit.vimages ,function(index,value){
   $scope.pathimages.push(value.url);
 })
  $scope.listview = false;
  $.each($scope.visit.operations,function(index,value){
    $scope.visit.operations_id.push(value.operation_id);
  })
  $timeout( function(){
   $('select').selectpicker({
    size: 6
  });
 }, 500 );
}

$scope.deletevisit = function(visitid){
  $rootScope.startblockui();
  Visits.deletevisit({id:visitid}, function (data) {
    if(data.status =="success"){
      $scope.getall();
      $rootScope.toastalert('Visit Deleted','success');
      $rootScope.stopblockui();
    }
  }, function (err) {
    console.log(err);
    $rootScope.stopblockui();
  });
}
$scope.calculrest = function(){
  $scope.visit.rest = $scope.visit.total - $scope.visit.payment
}
$scope.validform= function(){
  var value = true;
  if(angular.isUndefined($scope.visit.customer_id) || $scope.visit.customer_id==''){
    $("input[ng-model='visit.customer_id']").addClass("redBorder");
    value = false;
  }
  else{
    $("input[ng-model='visit.customer_id']").removeClass("redBorder");
  }
  if(angular.isUndefined($scope.visit.total) || $scope.visit.total==''){
    $("input[ng-model='visit.total']").addClass("redBorder");
    value = false;
  }
  else{
    $("input[ng-model='visit.total']").removeClass("redBorder");
  }
  if(angular.isUndefined($scope.visit.operations_id) || $scope.visit.operations_id==''){
    $("input[ng-model='visit.operations_id']").addClass("redBorder");
    value = false;
  }
  else{
    $("input[ng-model='visit.operations_id']").removeClass("redBorder");
  }
  return value;
}
$scope.back =function(){
  $scope.toothnote = false;
  $scope.listview = true;
  $scope.visit ={};
  $("#myDatepicker2").val('');
  $(".parenttooth").removeClass('redfill');
}
$scope.submit = function(){
  $scope.toothnote = false;
  if($scope.validform() == true){
   $rootScope.startblockui();
   $scope.visit.date_visit= $("#myDatepicker2").val();
   $scope.visit.uploadedfile = $scope.newpathimages;
   Visits.submit({data:$scope.visit}, function (data) {
     if(data.status =="OK"){
       $scope.newpathimages = [];
       $scope.visit.id = data.id;
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
$scope.presubmit = function(){
  if(myDropzone.getQueuedFiles().length > 0)
  {
    myDropzone.processQueue();
  }
  else{
    $scope.submit();
  }
}

$scope.addtooth = function(){
  $('.'+$scope.tooth.title+'-parent').addClass('redfill');
  var id = $scope.visit.teeth.findIndex(x => x.title === $scope.tooth.title);
  if(id > -1){
    $scope.visit.teeth.splice(id,1);
  }
  $scope.visit.teeth.push($scope.tooth);
  $scope.tooth = {};
  $scope.toothnote = false;
  $rootScope.toastalert('Teeth Added','success');
}

$scope.deletetooth = function(){
  $('.'+$scope.tooth.title+'-parent').removeClass('redfill');
  var id = $scope.visit.teeth.findIndex(x => x.title === $scope.tooth.title);
  if(id > -1){
    $scope.visit.teeth.splice(id,1);
  }
  $scope.tooth = {};
  $scope.toothnote = false;
  $rootScope.toastalert('Note Removed','success');
}

$scope.searchinarray = function(toothname){
  var id  = $scope.visit.teeth.findIndex(x => x.title === toothname);
  if(id > -1){
    $('.toothselect').selectpicker('destroy');
    $scope.tooth={};
    $scope.tooth.title= $scope.visit.teeth[id].title;
    $scope.tooth.note= $scope.visit.teeth[id].note;
    var ops=[];
    $scope.tooth.operations_id=[];
    console.log($scope.visit.teeth[id].operations_id);
    if($scope.visit.teeth[id].operations_id && $scope.visit.teeth[id].operations_id!=null && $scope.visit.teeth[id].operations_id!='null')
      var ops= $scope.visit.teeth[id].operations_id.split(",");
    $.each(ops,function(index,value){
      $scope.tooth.operations_id.push(parseInt(value));
    })
    $timeout( function(){
      $('.toothselect').selectpicker({
        size: 6
      });
    }, 100 );
  }else{
    $scope.tooth={};
    $scope.tooth.title = toothname;
  }

}

$scope.closetooth = function(){
  $scope.tooth = {};
  $scope.toothnote = false;
}











































$('.child-tooth-85').mouseover(function(){
  $('.child-tooth-85-parent').css('fill', 'red');
});

$('.child-tooth-85').click(function(){
 $scope.$apply(function () {
   $scope.searchinarray('child-tooth-85');
   $scope.toothnote = true;
 });
});
$('.child-tooth-85').mouseleave(function(){
  $('.child-tooth-85-parent').css('fill', 'none');
});
$('.child-tooth-84').mouseover(function(){
  $('.child-tooth-84-parent').css('fill', 'red');
});

$('.child-tooth-84').click(function(){
 $scope.$apply(function () {
   $scope.searchinarray('child-tooth-84');
   $scope.toothnote = true;
 });
});
$('.child-tooth-84').mouseleave(function(){
  $('.child-tooth-84-parent').css('fill', 'none');
});

$('.child-tooth-83').mouseover(function(){
  $('.child-tooth-83-parent').css('fill', 'red');
});

$('.child-tooth-83').click(function(){
 $scope.$apply(function () {
   $scope.searchinarray('child-tooth-83');
   $scope.toothnote = true;
 });
});
$('.child-tooth-83').mouseleave(function(){
  $('.child-tooth-83-parent').css('fill', 'none');
});

$('.child-tooth-82').mouseover(function(){
  $('.child-tooth-82-parent').css('fill', 'red');
});

$('.child-tooth-82').click(function(){
 $scope.$apply(function () {
   $scope.searchinarray('child-tooth-82');
   $scope.toothnote = true;
 });
});
$('.child-tooth-82').mouseleave(function(){
  $('.child-tooth-82-parent').css('fill', 'none');
});

$('.child-tooth-81').mouseover(function(){
  $('.child-tooth-81-parent').css('fill', 'red');
});

$('.child-tooth-81').click(function(){
 $scope.$apply(function () {
   $scope.searchinarray('child-tooth-81');
   $scope.toothnote = true;
 });
});
$('.child-tooth-81').mouseleave(function(){
  $('.child-tooth-81-parent').css('fill', 'none');
});
$('.child-tooth-75').mouseover(function(){
  $('.child-tooth-75-parent').css('fill', 'red');
});

$('.child-tooth-75').click(function(){
 $scope.$apply(function () {
   $scope.searchinarray('child-tooth-75');
   $scope.toothnote = true;
 });
});
$('.child-tooth-75').mouseleave(function(){
  $('.child-tooth-75-parent').css('fill', 'none');
});
$('.child-tooth-74').mouseover(function(){
  $('.child-tooth-74-parent').css('fill', 'red');
});

$('.child-tooth-74').click(function(){
 $scope.$apply(function () {
   $scope.searchinarray('child-tooth-74');
   $scope.toothnote = true;
 });
});
$('.child-tooth-74').mouseleave(function(){
  $('.child-tooth-74-parent').css('fill', 'none');
});

$('.child-tooth-73').mouseover(function(){
  $('.child-tooth-73-parent').css('fill', 'red');
});

$('.child-tooth-73').click(function(){
 $scope.$apply(function () {
   $scope.searchinarray('child-tooth-73');
   $scope.toothnote = true;
 });
});
$('.child-tooth-73').mouseleave(function(){
  $('.child-tooth-73-parent').css('fill', 'none');
});
$('.child-tooth-72').mouseover(function(){
  $('.child-tooth-72-parent').css('fill', 'red');
});

$('.child-tooth-72').click(function(){
 $scope.$apply(function () {
   $scope.searchinarray('child-tooth-72');
   $scope.toothnote = true;
 });
});
$('.child-tooth-72').mouseleave(function(){
  $('.child-tooth-72-parent').css('fill', 'none');
});
$('.child-tooth-71').mouseover(function(){
  $('.child-tooth-71-parent').css('fill', 'red');
});

$('.child-tooth-71').click(function(){
 $scope.$apply(function () {
   $scope.searchinarray('child-tooth-71');
   $scope.toothnote = true;
 });
});
$('.child-tooth-71').mouseleave(function(){
  $('.child-tooth-71-parent').css('fill', 'none');
});

$('.child-tooth-65').mouseover(function(){
  $('.child-tooth-65-parent').css('fill', 'red');
});

$('.child-tooth-65').click(function(){
 $scope.$apply(function () {
   $scope.searchinarray('child-tooth-65');
   $scope.toothnote = true;
 });
});
$('.child-tooth-65').mouseleave(function(){
  $('.child-tooth-65-parent').css('fill', 'none');
});

$('.child-tooth-64').mouseover(function(){
  $('.child-tooth-64-parent').css('fill', 'red');
});

$('.child-tooth-64').click(function(){
 $scope.$apply(function () {
   $scope.searchinarray('child-tooth-64');
   $scope.toothnote = true;
 });
});
$('.child-tooth-64').mouseleave(function(){
  $('.child-tooth-64-parent').css('fill', 'none');
});

$('.child-tooth-63').mouseover(function(){
  $('.child-tooth-63-parent').css('fill', 'red');
});

$('.child-tooth-63').click(function(){
 $scope.$apply(function () {
   $scope.searchinarray('child-tooth-63');
   $scope.toothnote = true;
 });
});
$('.child-tooth-63').mouseleave(function(){
  $('.child-tooth-63-parent').css('fill', 'none');
});

$('.child-tooth-62').mouseover(function(){
  $('.child-tooth-62-parent').css('fill', 'red');
});

$('.child-tooth-62').click(function(){
 $scope.$apply(function () {
   $scope.searchinarray('child-tooth-62');
   $scope.toothnote = true;
 });
});
$('.child-tooth-62').mouseleave(function(){
  $('.child-tooth-62-parent').css('fill', 'none');
});

$('.child-tooth-61').mouseover(function(){
  $('.child-tooth-61-parent').css('fill', 'red');
});

$('.child-tooth-61').click(function(){
 $scope.$apply(function () {
   $scope.searchinarray('child-tooth-61');
   $scope.toothnote = true;
 });
});
$('.child-tooth-61').mouseleave(function(){
  $('.child-tooth-61-parent').css('fill', 'none');
});

$('.child-tooth-55').mouseover(function(){
  $('.child-tooth-55-parent').css('fill', 'red');
});

$('.child-tooth-55').click(function(){
 $scope.$apply(function () {
   $scope.searchinarray('child-tooth-55');
   $scope.toothnote = true;
 });
});
$('.child-tooth-55').mouseleave(function(){
  $('.child-tooth-55-parent').css('fill', 'none');
});

$('.child-tooth-54').mouseover(function(){
  $('.child-tooth-54-parent').css('fill', 'red');
});

$('.child-tooth-54').click(function(){
 $scope.$apply(function () {
   $scope.searchinarray('child-tooth-54');
   $scope.toothnote = true;
 });
});
$('.child-tooth-54').mouseleave(function(){
  $('.child-tooth-54-parent').css('fill', 'none');
});
$('.child-tooth-53').mouseover(function(){
  $('.child-tooth-53-parent').css('fill', 'red');
});

$('.child-tooth-53').click(function(){
 $scope.$apply(function () {
   $scope.searchinarray('child-tooth-53');
   $scope.toothnote = true;
 });
});
$('.child-tooth-53').mouseleave(function(){
  $('.child-tooth-53-parent').css('fill', 'none');
});
$('.child-tooth-52').mouseover(function(){
  $('.child-tooth-52-parent').css('fill', 'red');
});

$('.child-tooth-52').click(function(){
 $scope.$apply(function () {
   $scope.searchinarray('child-tooth-52');
   $scope.toothnote = true;
 });
});
$('.child-tooth-52').mouseleave(function(){
  $('.child-tooth-52-parent').css('fill', 'none');
});

$('.child-tooth-51').mouseover(function(){
  $('.child-tooth-51-parent').css('fill', 'red');
});

$('.child-tooth-51').click(function(){
 $scope.$apply(function () {
   $scope.searchinarray('child-tooth-51');
   $scope.toothnote = true;
 });
});
$('.child-tooth-51').mouseleave(function(){
  $('.child-tooth-51-parent').css('fill', 'none');
});







$('.tooth-11').mouseover(function(){
  $('.tooth-11-parent').css('fill', 'red');
});

$('.tooth-11').click(function(){
 $scope.$apply(function () {
   $scope.searchinarray('tooth-11');
   $scope.toothnote = true;
 });

});


$('.tooth-11').mouseleave(function(){
  $('.tooth-11-parent').css('fill', 'none');
});

$('.tooth-12').click(function(){
 $scope.$apply(function () {
   $scope.searchinarray('tooth-12');
   $scope.toothnote = true;
 });
});
$('.tooth-12').mouseover(function(){
  $('.tooth-12-parent').css('fill', 'red');
});

$('.tooth-12').mouseleave(function(){
  $('.tooth-12-parent').css('fill', 'none');
});

$('.tooth-13').click(function(){
 $scope.$apply(function () {
   $scope.searchinarray('tooth-13');
   $scope.toothnote = true;
 });
});
$('.tooth-13').mouseover(function(){
  $('.tooth-13-parent').css('fill', 'red');
});

$('.tooth-13').mouseleave(function(){
  $('.tooth-13-parent').css('fill', 'none');
});

$('.tooth-14').click(function(){
 $scope.$apply(function () {
   $scope.searchinarray('tooth-14');
   $scope.toothnote = true;
 });
});
$('.tooth-14').mouseover(function(){
  $('.tooth-14-parent').css('fill', 'red');
});

$('.tooth-14').mouseleave(function(){
  $('.tooth-14-parent').css('fill', 'none');
});
$('.tooth-15').click(function(){
 $scope.$apply(function () {
   $scope.searchinarray('tooth-15');
   $scope.toothnote = true;
 });
});
$('.tooth-15').mouseover(function(){
  $('.tooth-15-parent').css('fill', 'red');
});

$('.tooth-15').mouseleave(function(){
  $('.tooth-15-parent').css('fill', 'none');
});
$('.tooth-16').click(function(){
 $scope.$apply(function () {
   $scope.searchinarray('tooth-16');
   $scope.toothnote = true;
 });
});
$('.tooth-16').mouseover(function(){
  $('.tooth-16-parent').css('fill', 'red');
});

$('.tooth-16').mouseleave(function(){
  $('.tooth-16-parent').css('fill', 'none');
});
$('.tooth-17').click(function(){
 $scope.$apply(function () {
   $scope.searchinarray('tooth-17');
   $scope.toothnote = true;
 });
});
$('.tooth-17').mouseover(function(){
  $('.tooth-17-parent').css('fill', 'red');
});

$('.tooth-17').mouseleave(function(){
  $('.tooth-17-parent').css('fill', 'none');
});
$('.tooth-18').click(function(){
 $scope.$apply(function () {
   $scope.searchinarray('tooth-18');
   $scope.toothnote = true;
 });
});
$('.tooth-18').mouseover(function(){
  $('.tooth-18-parent').css('fill', 'red');
});

$('.tooth-18').mouseleave(function(){
  $('.tooth-18-parent').css('fill', 'none');
});

/*Segundo Quadrante*/
$('.tooth-21').click(function(){
 $scope.$apply(function () {
   $scope.searchinarray('tooth-21');
   $scope.toothnote = true;
 });
});
$('.tooth-21').mouseover(function(){
  $('.tooth-21-parent').css('fill', 'red');
});

$('.tooth-21').mouseleave(function(){
  $('.tooth-21-parent').css('fill', 'none');
});
$('.tooth-22').click(function(){
 $scope.$apply(function () {
   $scope.searchinarray('tooth-22');
   $scope.toothnote = true;
 });
});
$('.tooth-22').mouseover(function(){
  $('.tooth-22-parent').css('fill', 'red');
});

$('.tooth-22').mouseleave(function(){
  $('.tooth-22-parent').css('fill', 'none');
});
$('.tooth-23').click(function(){
 $scope.$apply(function () {
   $scope.searchinarray('tooth-23');
   $scope.toothnote = true;
 });
});
$('.tooth-23').mouseover(function(){
  $('.tooth-23-parent').css('fill', 'red');
});

$('.tooth-23').mouseleave(function(){
  $('.tooth-23-parent').css('fill', 'none');
});
$('.tooth-24').click(function(){
 $scope.$apply(function () {
   $scope.searchinarray('tooth-24');
   $scope.toothnote = true;
 });
});
$('.tooth-24').mouseover(function(){
  $('.tooth-24-parent').css('fill', 'red');
});

$('.tooth-24').mouseleave(function(){
  $('.tooth-24-parent').css('fill', 'none');
});
$('.tooth-25').click(function(){
 $scope.$apply(function () {
   $scope.searchinarray('tooth-25');
   $scope.toothnote = true;
 });
});
$('.tooth-25').mouseover(function(){
  $('.tooth-25-parent').css('fill', 'red');
});

$('.tooth-25').mouseleave(function(){
  $('.tooth-25-parent').css('fill', 'none');
});
$('.tooth-26').click(function(){
 $scope.$apply(function () {
   $scope.searchinarray('tooth-26');
   $scope.toothnote = true;
 });
});
$('.tooth-26').mouseover(function(){
  $('.tooth-26-parent').css('fill', 'red');
});

$('.tooth-26').mouseleave(function(){
  $('.tooth-26-parent').css('fill', 'none');
});
$('.tooth-27').click(function(){
 $scope.$apply(function () {
   $scope.searchinarray('tooth-27');
   $scope.toothnote = true;
 });
});
$('.tooth-27').mouseover(function(){
  $('.tooth-27-parent').css('fill', 'red');
});

$('.tooth-27').mouseleave(function(){
  $('.tooth-27-parent').css('fill', 'none');
});
$('.tooth-28').click(function(){
 $scope.$apply(function () {
   $scope.searchinarray('tooth-28');
   $scope.toothnote = true;
 });
});
$('.tooth-28').mouseover(function(){
  $('.tooth-28-parent').css('fill', 'red');
});

$('.tooth-28').mouseleave(function(){
  $('.tooth-28-parent').css('fill', 'none');
});

/*Terceiro Quadrante*/
$('.tooth-31').click(function(){
 $scope.$apply(function () {
   $scope.searchinarray('tooth-31');
   $scope.toothnote = true;
 });
});
$('.tooth-31').mouseover(function(){
  $('.tooth-31-parent').css('fill', 'red');
});

$('.tooth-31').mouseleave(function(){
  $('.tooth-31-parent').css('fill', 'none');
});
$('.tooth-32').click(function(){
 $scope.$apply(function () {
   $scope.searchinarray('tooth-32');
   $scope.toothnote = true;
 });
});
$('.tooth-32').mouseover(function(){
  $('.tooth-32-parent').css('fill', 'red');
});

$('.tooth-32').mouseleave(function(){
  $('.tooth-32-parent').css('fill', 'none');
});
$('.tooth-33').click(function(){
 $scope.$apply(function () {
   $scope.searchinarray('tooth-33');
   $scope.toothnote = true;
 });
});
$('.tooth-33').mouseover(function(){
  $('.tooth-33-parent').css('fill', 'red');
});

$('.tooth-33').mouseleave(function(){
  $('.tooth-33-parent').css('fill', 'none');
});
$('.tooth-34').click(function(){
 $scope.$apply(function () {
   $scope.searchinarray('tooth-34');
   $scope.toothnote = true;
 });
});
$('.tooth-34').mouseover(function(){
  $('.tooth-34-parent').css('fill', 'red');
});

$('.tooth-34').mouseleave(function(){
  $('.tooth-34-parent').css('fill', 'none');
});
$('.tooth-35').click(function(){
 $scope.$apply(function () {
   $scope.searchinarray('tooth-35');
   $scope.toothnote = true;
 });
});
$('.tooth-35').mouseover(function(){
  $('.tooth-35-parent').css('fill', 'red');
});

$('.tooth-35').mouseleave(function(){
  $('.tooth-35-parent').css('fill', 'none');
});
$('.tooth-36').click(function(){
 $scope.$apply(function () {
   $scope.searchinarray('tooth-36');
   $scope.toothnote = true;
 });
});
$('.tooth-36').mouseover(function(){
  $('.tooth-36-parent').css('fill', 'red');
});

$('.tooth-36').mouseleave(function(){
  $('.tooth-36-parent').css('fill', 'none');
});
$('.tooth-37').click(function(){
 $scope.$apply(function () {
   $scope.searchinarray('tooth-37');
   $scope.toothnote = true;
 });
});
$('.tooth-37').mouseover(function(){
  $('.tooth-37-parent').css('fill', 'red');
});

$('.tooth-37').mouseleave(function(){
  $('.tooth-37-parent').css('fill', 'none');
});
$('.tooth-38').click(function(){
 $scope.$apply(function () {
   $scope.searchinarray('tooth-38');
   $scope.toothnote = true;
 });
});
$('.tooth-38').mouseover(function(){
  $('.tooth-38-parent').css('fill', 'red');
});

$('.tooth-38').mouseleave(function(){
  $('.tooth-38-parent').css('fill', 'none');
});

/*Quarto Quadrante*/
$('.tooth-41').click(function(){
 $scope.$apply(function () {
   $scope.searchinarray('tooth-41');
   $scope.toothnote = true;
 });
});
$('.tooth-41').mouseover(function(){
  $('.tooth-41-parent').css('fill', 'red');
});

$('.tooth-41').mouseleave(function(){
  $('.tooth-41-parent').css('fill', 'none');
});
$('.tooth-42').click(function(){
 $scope.$apply(function () {
   $scope.searchinarray('tooth-42');
   $scope.toothnote = true;
 });
});
$('.tooth-42').mouseover(function(){
  $('.tooth-42-parent').css('fill', 'red');
});

$('.tooth-42').mouseleave(function(){
  $('.tooth-42-parent').css('fill', 'none');
});
$('.tooth-43').click(function(){
 $scope.$apply(function () {
   $scope.searchinarray('tooth-43');
   $scope.toothnote = true;
 });
});
$('.tooth-43').mouseover(function(){
  $('.tooth-43-parent').css('fill', 'red');
});

$('.tooth-43').mouseleave(function(){
  $('.tooth-43-parent').css('fill', 'none');
});
$('.tooth-44').click(function(){
 $scope.$apply(function () {
   $scope.searchinarray('tooth-44');
   $scope.toothnote = true;
 });
});
$('.tooth-44').mouseover(function(){
  $('.tooth-44-parent').css('fill', 'red');
});

$('.tooth-44').mouseleave(function(){
  $('.tooth-44-parent').css('fill', 'none');
});
$('.tooth-45').click(function(){
 $scope.$apply(function () {
   $scope.searchinarray('tooth-45');
   $scope.toothnote = true;
 });
});
$('.tooth-45').mouseover(function(){
  $('.tooth-45-parent').css('fill', 'red');
});

$('.tooth-45').mouseleave(function(){
  $('.tooth-45-parent').css('fill', 'none');
});
$('.tooth-46').click(function(){
 $scope.$apply(function () {
   $scope.searchinarray('tooth-46');
   $scope.toothnote = true;
 });
});
$('.tooth-46').mouseover(function(){
  $('.tooth-46-parent').css('fill', 'red');
});

$('.tooth-46').mouseleave(function(){
  $('.tooth-46-parent').css('fill', 'none');
});
$('.tooth-47').click(function(){
 $scope.$apply(function () {
   $scope.searchinarray('tooth-47');
   $scope.toothnote = true;
 });
});
$('.tooth-47').mouseover(function(){
  $('.tooth-47-parent').css('fill', 'red');
});

$('.tooth-47').mouseleave(function(){
  $('.tooth-47-parent').css('fill', 'none');
});
$('.tooth-48').click(function(){
 $scope.$apply(function () {
   $scope.searchinarray('tooth-48');
   $scope.toothnote = true;
 });
});
$('.tooth-48').mouseover(function(){
  $('.tooth-48-parent').css('fill', 'red');
});

$('.tooth-48').mouseleave(function(){
  $('.tooth-48-parent').css('fill', 'none');
});
});