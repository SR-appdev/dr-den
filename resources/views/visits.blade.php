
<div class="col-md-12 col-sm-12 col-xs-12" ng-if="listview" ng-init="getall();getallpatients()">
	<div class="x_panel">
		<div class="x_title">
			<h2><small>Visits</small></h2>
			<button type="button" class="btn btn-default floatright" data-container="body" data-toggle="popover" data-placement="right" ng-click="addvisit()">
				ADD Visits
			</button>
			<div class="clearfix"></div>
		</div>
		<div class="x_content">

			<table id="datatable-responsive"  class="table table-striped table-bordered dt-responsive nowrap datatableclass jambo_table" cellspacing="0" width="100%">
				<thead>
					<tr>
						<th>Name</th>
						<th>Operations</th>
						<th>Total Of Visit</th>
						<th>Rest Of Visit</th>
						<th>Date Of Visit</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					<tr ng-repeat="visit in visits ">
						<td>@{{visit.patients.name}}</td>
						<td>
							<span ng-repeat="op in visit.operations">
								@{{op.name.name}} <span ng-if="!$last">,</span>
							</span>
						</td>
						<td>@{{visit.total}}</td>
						<td><span ng-class="{'redcolor': visit.rest>0}">@{{visit.rest}}</span></td>
						<td>@{{visit.created_at}}</td>
						<td align="center"><button type="button" class="btn btn-primary" ng-click="edit(visit)" data-container="body" data-toggle="popover" data-placement="right">
							Edit
						</button>
						<button ng-click="deletevisit(visit.id)" type="button" class="btn btn-danger" data-container="body" data-toggle="popover" data-placement="right">
							Delete
						</button></td>
					</tr>
				</tbody>
			</table>


		</div>
	</div>
</div>

<div class="col-md-12 background-white-padding" ng-show="!listview">

	<div class="" role="tabpanel" data-example-id="togglable-tabs">
		<ul id="myTab" class="nav nav-tabs bar_tabs" role="tablist">
			<li role="presentation" class="active"><a data-target ="#tab_content1" id="home-tab" role="tab" data-toggle="tab" aria-expanded="true">Visit Information</a>
			</li>
			<li role="presentation" class=""><a data-target="#tab_content2" role="tab" id="profile-tab" data-toggle="tab" aria-expanded="false">Patient Tooth</a>
			</li>
			<li role="presentation" class=""><a data-target="#tab_content3" role="tab" id="profile-tab2" data-toggle="tab" aria-expanded="false">Images</a>
			</li>
		</ul>
		<div id="myTabContent" class="tab-content">
			<div role="tabpanel" class="tab-pane fade active in row background-white" id="tab_content1" aria-labelledby="home-tab">
				<form class="form-horizontal form-label-left" novalidate>
					@csrf

					<input type="hidden" ng-model="visit.id" />
					<div class="item form-group">
						<label class="control-label col-md-3 col-sm-3 col-xs-12" for="name">Patient <span class="required">*</span>
						</label>
						<div class="col-md-6 col-sm-6 col-xs-12">
							<select  class="form-control" data-live-search="true"  ng-model='visit.customer_id' ng-options="x.id as x.name for x in patients"></select>
						</div>
					</div>
					<div class="item form-group">
						<label class="control-label col-md-3 col-sm-3 col-xs-12">Operations<span class="required">*</span>
						</label>
						<div class="col-md-6 col-sm-6 col-xs-12">
							<select multiple  data-live-search="true" class="form-control"  ng-model='visit.operations_id' ng-options="x.id as x.name for x in operations"></select>
						</div>
					</div>
					<div class="form-group">
						<label class="control-label col-md-3 col-sm-3 col-xs-12">Code</label>
						<div class="col-md-6 col-sm-6 col-xs-12">
							<input ng-model="visit.code" type="text" class="form-control">
							<span class="fa fa-user form-control-feedback right" aria-hidden="true"></span>
						</div>
					</div>
					<div class="form-group">
						<label class="control-label col-md-3 col-sm-3 col-xs-12">Total</label>
						<div class="col-md-6 col-sm-6 col-xs-12">
							<input ng-model="visit.total" type="text" class="form-control" ng-change="calculrest()">
							<span class="fa fa-user form-control-feedback right" aria-hidden="true"></span>
						</div>
					</div><div class="form-group">
						<label class="control-label col-md-3 col-sm-3 col-xs-12">Payment</label>
						<div class="col-md-6 col-sm-6 col-xs-12">
							<input ng-model="visit.payment" type="text" class="form-control" ng-change="calculrest()">
							<span class="fa fa-user form-control-feedback right" aria-hidden="true"></span>
						</div>
					</div><div class="form-group">
						<label class="control-label col-md-3 col-sm-3 col-xs-12">Rest</label>
						<div class="col-md-6 col-sm-6 col-xs-12">
							<input ng-model="visit.rest" type="text" class="form-control" ng-disabled="true">
							<span class="fa fa-user form-control-feedback right" aria-hidden="true"></span>
						</div>
					</div>
					<div class="form-group">
						<label class="control-label col-md-3 col-sm-3 col-xs-12"> Date Of Visit</label>
						<div class=" date col-md-6 col-sm-6 col-xs-12"  >
							<div  >
								<div class="input-group date" style="margin-bottom: 0px;">
									<input type="text" class="form-control" id="myDatepicker2">
									<span class="input-group-addon">
										<span class="glyphicon glyphicon-calendar"></span>
									</span>
								</div>
							</div>
						</div>
					</div>
					<div class="item form-group">
						<label class="control-label col-md-3 col-sm-3 col-xs-12" for="email">Address
						</label>
						<div class="col-md-6 col-sm-6 col-xs-12">
							<input ng-model="visit.address" type="text" id="email" name="email" required="required" class="form-control col-md-7 col-xs-12">
						</div>
					</div>
					<div class="item form-group">
						<label class="control-label col-md-3 col-sm-3 col-xs-12" for="textarea"> Description 
						</label>
						<div class="col-md-6 col-sm-6 col-xs-12">
							<textarea resizable="false" ng-model="visit.description" id="textarea" required="required" name="textarea" class="form-control col-md-7 col-xs-12"></textarea>
						</div>
					</div>
					
				</form>
			</div>
			<div role="tabpanel" class="tab-pane fade row background-white" id="tab_content2" aria-labelledby="profile-tab">
				<div class="item form-group">
					<label class="control-label col-md-3 col-sm-3 col-xs-12" for="textarea">&nbsp;
					</label>
					<div class="col-md-3 col-sm-3 col-xs-12">
						@include('include.dental_tooth');

					</div>
					<div class="col-md-3 col-sm-3 col-xs-12" ng-show="toothnote == true" style="margin-top: 20px;">
						<div class="toothnotetitle">@{{tooth.title}}
							<div class="colsenote" ng-click="closetooth()">
								<i class="fa fa-close"></i>
							</div>
						</div>
						<select multiple  data-live-search="true" class="form-control toothselect"  ng-model='tooth.operations_id' ng-options="x.id as x.name for x in operations"></select>
						<textarea resizable="false" rows="13" ng-model="tooth.note" id="textarea" required="required" name="textarea" class="form-control col-md-7 col-xs-12 toothnotetxt"></textarea>
						<button class="btn btn-primary" ng-click="addtooth()" style="margin-top: 5px;">Save Teeth</button>
						<button class="btn btn-danger" ng-click="deletetooth()" style="margin-top: 5px;">Remove Note</button>
					</div>
				</div>
			</div>
			<div role="tabpanel" class="tab-pane fade row background-white" id="tab_content3" aria-labelledby="profile-tab">
				<div class="item row form-group" ng-if="pathimages.length > 0">
					<div class="col-md-2 col-sm-2 col-xs-6 " ng-repeat="x in pathimages">
						<div class="imagescontainer">
							<a data-fancybox="gallery" href="/uploads/@{{x}}"><img src="/uploads/@{{x}}"></a>
						</div>
					</div>
				</div>
				<div ng-show="visit.id" class="dropzone dz-clickable"><div class="dz-default dz-message"><span>Drop files here to upload</span></div></div>
			</div>
		</div>
		<div class="ln_solid"></div>
		<div class="form-group">
			<div class="col-md-6 col-md-offset-3">
				<button type="submit" class="btn btn-primary" ng-click="back()">Back</button>
				<button id="send" type="submit" class="btn btn-success" ng-click="presubmit()">Submit</button>
			</div>
		</div>
	</div>