var client;
var lastMsg;

  // Create a client instance
  client = new Paho.MQTT.Client("wxgen.senia.org", 80, "/ws", "web_" + parseInt(Math.random() * 100, 10));

  // set callback handlers
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  var options = {
  //  useSSL: true,
  //  userName: "username",
  //  password: "password",
    onSuccess:onConnect,
    onFailure:doFail
  }

  // connect the client
  client.connect(options);

  // called when the client connects
  function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("onConnect");
    client.subscribe("wx.senia.org/weather/loop");
  }

  function doFail(e){
    console.log(e);
  }

  // called when the client loses its connection
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:"+responseObject.errorMessage);
    }
    client.connect(options);
  }

  // called when a message arrives
  function onMessageArrived(message) {
    console.log("onMessageArrived:"+message.payloadString);
    var msg = JSON.parse(message.payloadString);
    $('#temp').text(parseFloat(msg.outTemp_F).toFixed(1));
    $('#windspeed').text(msg.windSpeed_mph);
    $('#humidity').text(parseFloat(msg.outHumidity).toFixed(1));
    $('#windchill').text(parseFloat(msg.windchill_F).toFixed(1));
    if (typeof msg.windDir != 'undefined') {
        $('#windDirOrdinal').text(Windrose.getPoint(msg.windDir, { depth: 2 }).symbol);
        $('#windDir').text(parseFloat(msg.windDir).toFixed(0));
        if (msg.windDir < 22.5) {
                $('#windVector').html("&#8593")
        } else if (msg.windDir < 67.5) {
                $('#windVector').html("&#8599")
        } else if (msg.windDir < 112.5) {
                $('#windVector').html("&#8594")
        } else if (msg.windDir < 157.5) {
                $('#windVector').html("&#8600")
        } else if (msg.windDir < 202.5) {
                $('#windVector').html("&#8595")
        } else if (msg.windDir < 247.5) {
                $('#windVector').html("&#8601")
        } else if (msg.windDir < 292.5) {
                $('#windVector').html("&#8592")
        } else if (msg.windDir < 337.5) {
                $('#windVector').html("&#8598")
        } else {
                $('#windVector').html("&#8593")
        }
    } else {
        $('#windDirOrdinal').text("-");
        $('#windDir').text("-");
    }  
    $('#pressure').text(parseFloat(msg.barometer_inHg).toFixed(2));
    $('#dewpt').text(parseFloat(msg.dewpoint_F).toFixed(1));
    $('#rainrate').text(parseFloat(msg.rainRate_inch_per_hour).toFixed(2));
    $('#solarradiation').text(parseFloat(msg.radiation_Wpm2).toFixed(0));
    $('#uvindex').text(parseFloat(msg.UV).toFixed(1));
    $('#datetime').text(new Date(parseFloat(msg.dateTime).toFixed(0)*1000).toLocaleString());



  }
