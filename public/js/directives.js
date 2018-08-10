myApp.filter('formatdate',function(){
	return function(x){
		console.log(x);
		if(x!=null && x!='' && x!='undefined')
		return moment(x).format('MMM Do YYYY h:mm a');
	else
		return null;
	}
})
.filter('hourminute',function(){
	return function(x){
		console.log(x);
		if(x!=null && x!='' && x!='undefined')
		return moment(x).format('h:mm a');
	else
		return null;
	}
})