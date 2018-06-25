 var ToastConfig = ['ngToastProvider',
  function ToastConfigFn(ngToastProvider) {
    ngToastProvider.configure({
      animation: 'slide',
      horizontalPosition: 'center',
      verticalPosition: 'top',
      maxNumber: 0,
    });
  }];
 myApp.config(ToastConfig);
 myApp.config(function(blockUIConfig) {
  
  // Change the default overlay message
  blockUIConfig.template = `<section id="global">

    <div id="top" class="mask">
      <div class="plane"></div>
    </div>
    <div id="middle" class="mask">
      <div class="plane"></div>
    </div>

    <div id="bottom" class="mask">
      <div class="plane"></div>
    </div>
    
  <p><i>LOADING...</i></p>
    
</section>`;
  
  // Change the default delay to 100ms before the blocking is visible
  blockUIConfig.delay = 100;
  
});
 myApp.run(function($rootScope,$timeout,ngToast,blockUI) {

 	$rootScope.datatable = function(){
 		$timeout(function () {
 			$('.datatableclass').DataTable();
 		}, 500); 
 	}

 	$rootScope.toastalert = function(message,type){
 		ngToast.create({
        className: type,
        content: '<i class="fa fa-gear fa-spin"></i> '+ message+ '',
        timeout: 2500,
        dismissButton: true
      });
 	}
 	$rootScope.startblockui = function(){
 		blockUI.start();
 	}
 	$rootScope.stopblockui = function(){
 		blockUI.stop();
 	}
 });