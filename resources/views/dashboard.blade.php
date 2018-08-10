<div class="row tile_count nomrgbtn" ng-init="getall()">
  <div class="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
    <span class="count_top"><i class="fa fa-user"></i> NO. of Patients</span>
    <div class="count">@{{stat.patients}}</div>
    <span class="count_bottom">Since inception</span>
  </div>
  <div class="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
    <span class="count_top"><i class="fa fa-clock-o"></i> No. of Visits</span>
    <div class="count">@{{stat.visits}}</div>
    <span class="count_bottom">Since inception</span>
  </div>
  <div class="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
    <span class="count_top"><i class="fa fa-user"></i> No. of Apointment</span>
    <div class="count green">@{{stat.apointment}}</div>
    <span class="count_bottom">Starting Today</span>
  </div>
  <div class="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
    <span class="count_top"><i class="fa fa-user"></i> Total Income</span>
    <div class="count">@{{stat.total | number:0}}</div>
    <span class="count_bottom">Current Month</span>
  </div>
  <div class="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
    <span class="count_top"><i class="fa fa-user"></i> Total Paid</span>
    <div class="count">@{{stat.paid | number:0}}</div>
    <span class="count_bottom">Current Month</span>
  </div>
  <div class="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
    <span class="count_top"><i class="fa fa-user"></i> Total Rest</span>
    <div class="count">@{{stat.rest | number:0}}</div>
    <span class="count_bottom">Current Month</span>
  </div>
</div>


<div class="row">
  <div class="col-md-12 col-sm-12 col-xs-12">
    <div class="x_panel">
      <div class="x_title">
        <h2>Income Of Last 6 Months</h2>
        <div class="clearfix"></div>
      </div>
      <div class="x_content">
        <div id="mainb" style="height:350px;"></div>
      </div>
    </div>
  </div>
</div>
<div class="row">
  <div class="col-md-6 col-sm-6 col-xs-12">
    <div class="col-md-12">
    <div class="x_panel">
      <div class="x_title">
        <h2>Operations</h2>

        <div class="clearfix"></div>
      </div>
      <div class="x_content">

        <div id="echart_pie2" style="height: 350px; -webkit-tap-highlight-color: transparent; user-select: none; position: relative; background-color: transparent;" _echarts_instance_="ec_1533755206933"><div style="position: relative; overflow: hidden; width: 358px; height: 350px; cursor: default;"><canvas width="447" height="437" data-zr-dom-id="zr_0" style="position: absolute; left: 0px; top: 0px; width: 358px; height: 350px; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></canvas></div><div style="position: absolute; display: none; border-style: solid; white-space: nowrap; z-index: 9999999; transition: left 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s, top 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s; background-color: rgba(0, 0, 0, 0.5); border-width: 0px; border-color: rgb(51, 51, 51); border-radius: 4px; color: rgb(255, 255, 255); font: 14px/21px Arial, Verdana, sans-serif; padding: 5px; left: 81.9375px; top: 118.2px;">Area Mode <br>rose1 : 10 (9.09%)</div></div>

      </div>
    </div>
  </div>
</div>
  <div class="col-md-6 col-sm-6 col-xs-12">
    <div class="x_panel">
      <div class="x_title">
        <h3>Today Apointments</h3>
        <div class="clearfix"></div>
      </div>
      <div class="x_content" style="min-height: 355px;">
        <ul class="list-unstyled timeline">
          <li ng-repeat="x in stat.userapointment">
            <div class="block">
              <div class="tags">
                <a href="" class="tag">
                  <span>@{{x.schedule_date | hourminute}}</span>
                </a>
              </div>
              <div class="block_content">
                <h2 class="title">
                  <a>@{{x.customer.name}}</a>
                </h2>
              </div>
            </div>
          </li>
        </ul>

      </div>
    </div>
  </div>
 

</div>
