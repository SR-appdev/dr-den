/* global app */

myApp.controller('CalendarController', function ($scope,Calendar, $rootScope,$timeout) {
	$scope.calendarev = {};
	$scope.getcalendar = function(){
		$rootScope.startblockui();
		Calendar.allcalendar({data:$scope.interval}, function (data) {
			$scope.calendar = data.calendar;
			$('#calendar').fullCalendar('renderEvents', $scope.calendar, true); 
			$rootScope.stopblockui();
		}, function (err) {
			console.log(err);
			$rootScope.stopblockui();
		});
	}
	$('#calendar').fullCalendar({
		defaultView: 'agendaWeek',
		firstDay: 1,
		nowIndicator : true,
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'agendaWeek,agendaDay'
		},
		defaultDate: moment().format("YYYY-M-D"),
      navLinks: true, // can click day/week names to navigate views
      editable: true,
      eventLimit: true, // allow "more" link when too many events
      selectable: true,
      selectHelper: true,
      select: function(start, end) {
      	$scope.$apply(function () {
      		$('select').selectpicker('destroy');
      		$scope.calendarev = {};
      		$('#calendermodal').modal('show');
      		$scope.calendarev.schedule_date = start;
      		$scope.calendarev.end_date = end;
      		$timeout( function(){
      			$('select').selectpicker({
      				size: 6
      			});
      		}, 500 );
      	});
      	var eventData;
      // 	if (title) {
      // 		eventData = {
      // 			title: title,
      // 			start: start,
      // 			end: end
      // 		};
      //     $('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
      // }
      $('#calendar').fullCalendar('unselect');
  },
  eventClick: function(calEvent, jsEvent, view) {
  	$scope.$apply(function () {
  		$('select').selectpicker('destroy');
  		$scope.calendarev = {};
  		$scope.calendarev.customer_id = calEvent.customer_id;
  		$scope.eventid = calEvent._id;
  		$scope.calendarev.id = calEvent.id;
  		$scope.calendarev.note = calEvent.note;
  		$scope.calendarev.schedule_date = moment(calEvent.start).format('YYYY-MM-DD HH:mm:ss');
  		$scope.calendarev.end_date = moment(calEvent.end).format('YYYY-MM-DD HH:mm:ss');
  		$("#savechange").on("click", function() {
  			calEvent.title = $("#selectpatient option:selected").text();
  			calEvent.note = $("#textareapatient").val();
  			calEvent.customer_id = $("#selectpatient").val();
  			$('#calendar').fullCalendar('updateEvent', calEvent);
  		});

  		$timeout( function(){
  			$('select').selectpicker({
  				size: 6
  			});
  		}, 500 );
  	});


  	
  	$('#calendermodal').modal('show');
  	$('#calendar').fullCalendar('unselect');

  },
  eventResize: function(event, delta, revertFunc) {

  	// alert(event.title + " end is now " + event.end.format());

  	if (!confirm("Are you sure about this change?")) {
  		revertFunc();
  	}
  	else{
  		$rootScope.startblockui();
  		Calendar.resize({id:event.id,end:event.end.format()}, function (data) {
  			$rootScope.stopblockui();
  		}, function (err) {
  			console.log(err);
  			$rootScope.stopblockui();
  		});
  	}

  },
  eventDrop: function(event, delta, revertFunc) {

  	// alert(event.title + " was dropped on " + event.start.format());
  	if (!confirm("Are you sure about this change?")) {
  		revertFunc();
  	}
  	else{
  		$rootScope.startblockui();
  		Calendar.drag({id:event.id,start:event.start.format(),end:event.end.format()}, function (data) {
  			$rootScope.stopblockui();
  		}, function (err) {
  			console.log(err);
  			$rootScope.stopblockui();
  		});
  	}

  },
  viewRender:function(view, element) {
  	$('#calendar').fullCalendar( 'removeEvents');
  	$scope.interval = {};
  	$scope.interval.start = view.intervalStart.format();
  	$scope.interval.end = view.intervalEnd.format();
  	$scope.getcalendar();
  }
});
	$scope.removecal = function(){
		$rootScope.startblockui();
		Calendar.deletecal({id:$scope.calendarev.id}, function (data) {
			if(data['status']=='OK'){
				$('#calendar').fullCalendar( 'removeEvents',$scope.eventid );
				$scope.eventid = '';
				$rootScope.toastalert('Apointment Deleted','success');
				$('#calendermodal').modal('hide');
				$scope.calendarev ={};
			}
			$rootScope.stopblockui();
		}, function (err) {
			console.log(err);
			$rootScope.stopblockui();
		});

	}

	$scope.onsavecal = function(){
		if(angular.isUndefined($scope.calendarev.customer_id) || $scope.calendarev.customer_id==''){
			$("select[ng-model='calendarev.customer_id']").addClass("redBorder");
			$rootScope.toastalert('Please Select a patient','danger');
			return false;
		}
		else{
			$rootScope.startblockui();
			$("select[ng-model='calendarev.customer_id']").removeClass("redBorder");
			Calendar.submit({data:$scope.calendarev}, function (data) {
				if(data.status =="OK"){
					var id = $scope.patients.findIndex(x => x.id == $scope.calendarev.customer_id);
					var	eventData = {
						title: $scope.patients[id].name,
						start: $scope.calendarev.schedule_date,
						end: $scope.calendarev.end_date,
						id: data.id,
						customer_id: $scope.calendarev.customer_id,
						note: $scope.calendarev.note
					};
					if(angular.isUndefined($scope.calendarev.id) || $scope.calendarev.id==''){
						$('#calendar').fullCalendar('renderEvent', eventData, true); 
					}
					$('#calendermodal').modal('hide');
					$scope.calendarev ={};
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

	$scope.getpatients = function(){
		$rootScope.startblockui();
		Calendar.allpatient({}, function (data) {
			$scope.patients = data.patients;
			$rootScope.stopblockui();
		}, function (err) {
			console.log(err);
			$rootScope.stopblockui();
		});
	}
	
	$scope.getpatients();
});
