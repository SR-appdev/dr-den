     <div class="row">
     	<div class="col-md-12">
     		<div class="x_panel">
     			<div class="x_title">
     				<h2>Apointment </h2>
     				<div class="clearfix"></div>
     			</div>
     			<div class="x_content">

     				<div id='calendar'></div>

     			</div>
     		</div>
     	</div>
     </div>

     <div class="modal fade" id="calendermodal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
     	<div class="modal-dialog" role="document">
     		<div class="modal-content">
     			<div class="modal-header">
     				<h5 class="modal-title" id="exampleModalLabel">Appointment</h5>
     				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
     					<span aria-hidden="true">&times;</span>
     				</button>
     			</div>
     			<div class="modal-body">
     				<form class="form-horizontal form-label-left" novalidate>
     					@csrf

     					<input type="hidden" ng-model="calendarev.id" />
     					<div class="item form-group">
     						<label class="control-label col-md-3 col-sm-3 col-xs-12" for="name">Patient <span class="required">*</span>
     						</label>
     						<div class="col-md-6 col-sm-6 col-xs-12">
     							<select id="selectpatient" class="form-control" data-live-search="true"  ng-model='calendarev.customer_id'>
                                          <option ng-repeat="x in patients" value="@{{x.id}}">@{{x.name}}</option>                            
                                     </select>
                                </div>
                           </div>
                           <div class="item form-group">
                               <label class="control-label col-md-3 col-sm-3 col-xs-12" for="textarea"> Note 
                               </label>
                               <div class="col-md-6 col-sm-6 col-xs-12">
                                <textarea id="textareapatient" resizable="false" ng-model="calendarev.note" id="textarea" required="required" name="textarea" class="form-control col-md-7 col-xs-12"></textarea>
                           </div>
                      </div>
                 </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button ng-show="calendarev.id" type="button" class="btn btn-danger" ng-click="removecal()">Remove</button>
              <button type="button" id = "savechange" class="btn btn-primary" ng-click="onsavecal()">Save changes</button>
         </div>
    </div>
</div>
</div>