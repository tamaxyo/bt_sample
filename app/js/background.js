(function(){
  DEVICE_ADDRESS = "<device address - XX:XX:XX:XX:XX:XX>";

  console.log("start app");

  var timestamp = function() {
    d = new Date();
    return d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + " - ";
  };

  var getDevices = function() {
    chrome.bluetooth.getDevices(function(devices){
      console.log("got devices : ", devices.length);
      for(var i = 0; i < devices.length; i++) {
        console.log("  ", devices[i].address);
      }
    });
  };

  getDevices();

  chrome.bluetooth.onDeviceAdded.addListener(function(device){
    console.log(timestamp(), "device added : ", device.address);
    getDevices();
  });

  chrome.bluetooth.onDeviceRemoved.addListener(function(device){
    console.log(timestamp(), "device removed : ", device.address);
    getDevices();
  });

  chrome.bluetooth.onDeviceChanged.addListener(function(device){
    console.log("device changed : ", device.address);
  });

  var getDevice = function() {
    chrome.bluetooth.getDevice(DEVICE_ADDRESS, function(device){
      if(chrome.runtime.lastError) {
        console.warn(chrome.runtime.lastError.message);
      } else {
        console.log(device);
      }
    });
  };

  var timer = setInterval(getDevice, 1000);
  chrome.bluetooth.startDiscovery(function(){
    console.log("start discovery");
    setTimeout(function(){
      chrome.bluetooth.stopDiscovery(function(){
        console.log("stop discovery");
        clearTimer(timer);
      });
    }, 5 * 60 * 1000);
  });
  
  
})();

