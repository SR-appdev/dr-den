<div class="col-md-12 col-sm-12 col-xs-12" ng-if="listview" ng-init="getall()">
  <div class="x_panel">
    <div class="x_title">
      <h2><small>Patients</small></h2>
      <button type="button" class="btn btn-default floatright" data-container="body" data-toggle="popover" data-placement="right" ng-click="addpatient()">
        ADD Patients
      </button>
      <div class="clearfix"></div>
    </div>
    <div class="x_content">

      <table id="datatable-responsive"  class="table table-striped table-bordered dt-responsive nowrap datatableclass jambo_table" cellspacing="0" width="100%">
        <thead>
          <tr>
            <th width="25%" >Name</th>
            <th  width="25%"  >Phone</th>
            <th  width="25%"  >Last Visite</th>
            <th  width="25%"  ></th>
          </tr>
        </thead>
        <tbody>
          <tr ng-repeat="patient in patients ">
            <td>@{{patient.name}}</td>
            <td>@{{patient.phone}}</td>
            <td>@{{patient.phone}}</td>
            <td align="center"><button type="button" class="btn btn-primary" ng-click="edit(patient)" data-container="body" data-toggle="popover" data-placement="right">
              Edit
            </button>
            <button ng-click="deletepatient(patient.id)" type="button" class="btn btn-danger" data-container="body" data-toggle="popover" data-placement="right">
              Delete
            </button></td>
          </tr>
        </tbody>
      </table>


    </div>
  </div>
</div>

<div class="row" ng-show="!listview">
  <div class="col-md-12 col-sm-12 col-xs-12">
    <div class="x_panel">
      <div class="x_content">

        <form class="form-horizontal form-label-left" novalidate>

          <span class="section">Personal Info</span>
          <input type="hidden" ng-model="patient.id" />
          <div class="item form-group">
            <label class="control-label col-md-3 col-sm-3 col-xs-12" for="name">Name <span class="required">*</span>
            </label>
            <div class="col-md-6 col-sm-6 col-xs-12">
              <input ng-model="patient.name" id="name" class="form-control col-md-7 col-xs-12" data-validate-length-range="6" data-validate-words="2" name="name" placeholder="Patient Name" required="required" type="text">
            </div>
          </div>
          <div class="form-group">
            <label class="control-label col-md-3 col-sm-3 col-xs-12">Phone Number</label>
            <div class="col-md-6 col-sm-6 col-xs-12">
              <input ng-model="patient.phone" type="text" class="form-control" data-inputmask="'mask': '99-999999'">
              <span class="fa fa-user form-control-feedback right" aria-hidden="true"></span>
            </div>
          </div>
          <div class="form-group">
             <label class="control-label col-md-3 col-sm-3 col-xs-12">Date Of Birthday</label>
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
            <input ng-model="patient.address" type="text" id="email" name="email" required="required" class="form-control col-md-7 col-xs-12">
          </div>
        </div>
        <div class="item form-group">
          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="textarea"> Description 
          </label>
          <div class="col-md-6 col-sm-6 col-xs-12">
            <textarea  ng-model="patient.description" id="textarea" required="required" name="textarea" class="form-control col-md-7 col-xs-12"></textarea>
          </div>
        </div>
        <div class="ln_solid"></div>
        <div class="form-group">
          <div class="col-md-6 col-md-offset-3">
            <button type="submit" class="btn btn-primary" ng-click="back()">Cancel</button>
            <button id="send" type="submit" class="btn btn-success" ng-click="submit()">Submit</button>
            <button ng-if="patient.id > 0" id="send" type="submit" class="btn btn-primary" ng-click="redirecttovisit(patient.id)">Visit</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
</div>