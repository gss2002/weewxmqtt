## exfoliation for weewx - Copyright 2012-2013 Matthew Wall
## $Id: header.inc 986 2014-08-10 15:47:33Z mwall $

<div id='header'>
  
  <div id='station_info'>
    <span class='station_title'>$station.location</span><br/>
    <span id='datetime' class='station_time'>$current.dateTime</span>
  </div>
  
  <div id='navigation_controls'>
    <a href='.'>Current</a>
#if $varExists('forecast')
    <a href='forecast.html'>Forecast</a>
#end if
    <a href='history.html'>History</a>
    <a href='almanac.html'>Almanac</a>
#if $Extras.has_key('show_station_page') and $Extras.show_station_page == 'true'
    <a href='station.html'>Station</a>
#end if
#if $Extras.has_key('show_links_page') and $Extras.show_links_page == 'true'
    <a href='links.html'>Links</a>
#end if
  </div>
  
</div>
