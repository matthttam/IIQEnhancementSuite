importScripts("./config.js")

chrome.webRequest.onCompleted.addListener(function (details) {
  console.log('trigger1')
  // RapidScan API call check
  if (details.url.includes('/api/v1.0/search/scan') && details.statusCode == 200) {
    getCurrentTab().then(function (currentTab) {

      checkFailedScan(currentTab.id)
    })
  }
}, { urls: ["https://*.incidentiq.com/*"] });

chrome.webRequest.onCompleted.addListener(function (details) {
  if (!details.statusCode == 200) {
    return
  }
  chrome.storage.sync.get(Config.DEFAULT_OPTIONS).then((settings) => {

    if (!settings.IIQBatchChecKIn_AutoFocus) {
      return
    }
    // Storage Unit Scan Check
    getCurrentTab().then(function (currentTab) {
      focusDeviceTextbox(currentTab.id)
    })
  })
}, { urls: ["https://*.incidentiq.com/api/v1.0/assets/storageunit/*"] })

async function checkFailedScan(tabID) {
  await chrome.tabs.sendMessage(tabID,
    {
      action: Config.RAPIDSCAN_CHECK
    });
}

async function focusDeviceTextbox(tabID) {
  await chrome.tabs.sendMessage(tabID,
    {
      action: Config.FOCUS_DEVICE_TEXTBOX
    });
}

async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}