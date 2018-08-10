/* global app */

myApp.controller('DashboardController', function ($scope,Dashboard, $rootScope) {
	$scope.stat = {};

	$scope.incomemonth = function(){
		if ($('#mainb').length ){

			var echartBar = echarts.init(document.getElementById('mainb'));

			echartBar.setOption({
				tooltip: {
					trigger: 'axis'
				},
				legend: {
					data: ['Total', 'Paid']
				},
				toolbox: {
					show: false
				},
				calculable: false,
				xAxis: [{
					type: 'category',
					data: $scope.stat.monthname
				}],
				yAxis: [{
					type: 'value'
				}],
				series: [{
					name: 'Total',
					type: 'bar',
					data: $scope.stat.totalmonth,
					markLine: {
						data: [{
							type: 'average',
							name: 'total'
						}]
					}
				}, {
					name: 'Paid',
					type: 'bar',
					data: $scope.stat.totalpaid,
					markLine: {
						data: [{
							type: 'average',
							name: 'paid'
						}]
					}
				}]
			});

		}
	}

	$scope.opchart = function(){
		if ($('#echart_pie2').length ){ 

			var echartPieCollapse = echarts.init(document.getElementById('echart_pie2'));

			echartPieCollapse.setOption({
				tooltip: {
					trigger: 'item',
					formatter: "{a} <br/>{b} : {c} ({d}%)"
				},
				legend: {
					x: 'center',
					y: 'bottom',
					data: $scope.stat.opname
				},
				toolbox: {
					show: true,
					feature: {
						magicType: {
							show: true,
							type: ['pie', 'funnel']
						},
						saveAsImage: {
							show: true,
							title: "Save Image"
						}
					}
				},
				calculable: true,
				series: [{
					name: 'Operation',
					type: 'pie',
					radius: [25, 90],
					center: ['50%', 170],
					roseType: 'area',
					x: '50%',
					max: 40,
					sort: 'ascending',
					data: $scope.stat.opcount
				}]
			});

		} 
	}

	$scope.getall = function(){
		$rootScope.startblockui();
		Dashboard.all({}, function (data) {
			$scope.stat = data.data;
			$scope.incomemonth();
			$scope.opchart();
			$rootScope.stopblockui();
		}, function (err) {
			console.log(err);
			$rootScope.stopblockui();
		});
	}
});