<div class="row" ng-init="getall()">
              <div class="col-md-12">
                <div class="x_panel">
                  <div class="x_title">
                    <h2>Media Gallery</h2>
                    <div class="clearfix"></div>
                  </div>
                  <div class="x_content">
                    <div class="row">
                      <div class="col-md-55" ng-repeat="x in gallery">
                        <div class="thumbnail">
                          <div class="image view view-first">
                            <a data-fancybox="gallery" href="/uploads/@{{x.url}}"><img src="/uploads/@{{x.url}}"></a>
                          </div>
                          <div class="caption">
                            <p>@{{x.customer.name}} <br>@{{x.created_at | formatdate}}</p>
                          </div>
                        </div>
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>