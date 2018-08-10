<div class="col-md-12 col-sm-12 col-xs-12">
  <div class="x_panel">
    <div class="x_title">
      <h2><small>Invoices</small></h2>
      <div class="col-md-5 pull-right" style="margin-top: 10px">
        <div class="control-group " >
          <div class="controls">
            <div class="input-prepend input-group">
              <span class="add-on input-group-addon"><i class="glyphicon glyphicon-calendar fa fa-calendar"></i></span>
              <input type="text" name="reservation-time" id="reservation-time" class="form-control" value="">
            </div>
          </div>
        </div>
      </div>
      <div class="clearfix"></div>
    </div>
    <div class="x_content">

      <table id="datatable-responsive"  class="table table-striped table-bordered dt-responsive nowrap datatableclass jambo_table" cellspacing="0" width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr ng-repeat="invoice in invoices ">
            <td align="center">@{{invoice.customer.name}}</td>
            <td align="center">@{{invoice.paid}}</td>
            <td align="center">@{{invoice.created_at | formatdate}}</td>
          </tr>
        </tbody>
      </table>


    </div>
  </div>
</div>
