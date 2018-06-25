<div class="left_col scroll-view">
            <div class="navbar nav_title" style="border: 0;">
              <a href="/" class="site_title"><i class="fa fa-user-md"></i> <span>Dental Clinic</span></a>
            </div>

            <div class="clearfix"></div>

          

            <br />

            <!-- sidebar menu -->
            <div id="sidebar-menu" class="main_menu_side hidden-print main_menu">
              <div class="menu_section">
                <!-- <h3>General</h3> -->
                <ul class="nav side-menu">
                  @foreach($menu as $value)
                  @if(count($value['child']) > 0 )
                  <li><a><i class="{{$value['icon']}}"></i> {{$value['translate'][0]['name']}} <span class="fa fa-chevron-down"></span></a>
                    <ul class="nav child_menu">
                      @foreach($value['child'] as $child)
                      <li><a href="{{$child['url']}}">{{$child['translate'][0]['name']}}</a></li>
                      @endforeach
                    </ul>
                  </li>
                  @else
                   <li><a href="{{$value['url']}}"><i class="{{$value['icon']}}"></i> {{$value['translate'][0]['name']}}</a></li>
                   @endif
                   @endforeach
                 
                </ul>
              </div>

            </div>
          </div>