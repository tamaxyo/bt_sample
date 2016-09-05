(function(){
  // chrome.app.runtime.onLaunched.addListener(function() {
  //   chrome.app.window.create('window.html', {
  //     'outerBounds' : {
  //       'width' : 480,
  //       'height' : 500
  //     }
  //   })
  // });

  console.log("start app");
  
  chrome.bluetooth.getDevices(function(devices){
    console.log("got devices : ", devices.length);
    for(var i = 0; i < devices.length; i++) {
      console.log("  ", devices[i].address);
    }
  });

  chrome.bluetooth.onDeviceAdded.addListener(function(device){
    console.log("device added : ", device.address);
  });

  chrome.bluetooth.onDeviceRemoved.addListener(function(device){
    console.log("device removed : ", device.address);
  });

  chrome.bluetooth.onDeviceChanged.addListener(function(device){
    console.log("device changed : ", device.address);
  });

  chrome.bluetooth.startDiscovery(function(){
    console.log("start discovery");
    setTimeout(function(){
      chrome.bluetooth.stopDiscovery(function(){
        console.log("stop discovery");
      });
    }, 30000);
  });
})();

