(function(){
  chrome.bluetooth.onDeviceAdded.addListener(function(device){
    console.log("device added : ", device.address);
  });

  chrome.bluetooth.onDeviceRemoved.addListener(function(device){
    console.log("device removed : ", device.address);
  });

  chrome.bluetooth.onDeviceChanged.addListener(function(device){
    console.log("device changed : ", device.address);
  });
})();
