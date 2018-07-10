<div class="col-md-12 col-sm-12 col-xs-12" ng-if="listview" ng-init="getall()">
  <div class="x_panel">
    <div class="x_title">
      <h2><small>Operations</small></h2>
      <button type="button" class="btn btn-default floatright" data-container="body" data-toggle="popover" data-placement="right" ng-click="addoperations()">
        ADD Operations
      </button>
      <div class="clearfix"></div>
    </div>
    <div class="x_content">

      <table id="datatable-responsive"  class="table table-striped table-bordered dt-responsive nowrap datatableclass jambo_table" cellspacing="0" width="100%">
        <thead>
          <tr>
            <th>Operation</th>
            <th  >Color</th>
            <th  ></th>
          </tr>
        </thead>
        <tbody>
          <tr ng-repeat="operation in myoperations ">
            <td>@{{operation.name}}</td>
            <td align="center"><div class="colorop" style="background-color: @{{operation.color}}"></div>
            </td>
            <td align="center"><button type="button" class="btn btn-primary" ng-click="edit(operation)" data-container="body" data-toggle="popover" data-placement="right">
              Edit
            </button>
            <button ng-click="deleteoperations(operation.id)" type="button" class="btn btn-danger" data-container="body" data-toggle="popover" data-placement="right">
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

          <span class="section">Operation</span>
          <input type="hidden" ng-model="operations.id" />
          <div class="item form-group">
            <label class="control-label col-md-3 col-sm-3 col-xs-12" for="name">Name <span class="required">*</span>
            </label>
            <div class="col-md-6 col-sm-6 col-xs-12">
              <input ng-model="operations.name" id="name" class="form-control col-md-7 col-xs-12" data-validate-length-range="6" data-validate-words="2" name="name" placeholder="operations Name" required="required" type="text">
            </div>
          </div>

          <div class="item form-group">
            <label class="control-label col-md-3 col-sm-3 col-xs-12" for="email">Color
            </label>
            <div class="col-md-6 col-sm-6 col-xs-12 colorpicker-component" id="colorpicker">
              <input style="display: none;" ng-model="operations.color" type="text"  required="required" class="form-control col-md-7 col-xs-12">
              <span class="input-group-addon"><i class="colorwall"></i></span>
            </div>
          </div>
          <div class="ln_solid"></div>
          <div class="form-group">
            <div class="col-md-6 col-md-offset-3">
              <button type="submit" class="btn btn-primary" ng-click="back()">Cancel</button>
              <button id="send" type="submit" class="btn btn-success" ng-click="submit()">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>