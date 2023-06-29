importScripts("./common.js")

// IIQES_RAPIDSCAN_SOUND Feature
chrome.webRequest.onCompleted.addListener(function (details) {
  log("https://*.incidentiq.com/api/v1.0/search/scan Triggered")
  if (details.statusCode != 200)
    return

  chrome.storage.sync.get(Config.DEFAULT_OPTIONS).then((settings) => {
    if (!settings.IIQES_RapidScan_Sounds) {
      log("IIQES_RapidScan_Sounds Not Enabled")
      return
    }

    getCurrentTab().then(async function (currentTab) {
      if (!currentTab)
        return
      await chrome.tabs.sendMessage(currentTab.id,
        {
          action: Message.IIQES_RAPIDSCAN_SOUND
        });
    })
  })
}, { urls: ["https://*.incidentiq.com/api/v1.0/search/scan"] });

// IIQES_BATCHCHECKIN_AUTOFOCUS Feature
chrome.webRequest.onCompleted.addListener(function (details) {
  log("https://*.incidentiq.com/api/v1.0/assets/storageunit/* Triggered")
  if (details.statusCode != 200)
    return

  chrome.storage.sync.get(Config.DEFAULT_OPTIONS).then((settings) => {
    if (!settings.IIQES_BatchCheckIn_AutoFocus) {
      log("IIQES_BatchCheckIn_AutoFocus Not Enabled")
      return
    }

    getCurrentTab().then(async function (currentTab) {
      if (!currentTab)
        return
      await chrome.tabs.sendMessage(currentTab.id,
        {
          action: Message.IIQES_BATCHCHECKIN_AUTOFOCUS
        });
    })
  })
}, { urls: ["https://*.incidentiq.com/api/v1.0/assets/storageunit/*"] })

// IIQES_ISSUES_TOGGLEVISIBILITY Feature
chrome.webRequest.onCompleted.addListener(function (details) {
  if (details.statusCode != 200)
    return

  getCurrentTab().then(async function (currentTab) {
    if (!currentTab)
      return
    const regexPattern = /^https:\/\/.*\.incidentiq\.com\/agent\/issues.*/;
    if (regexPattern.test(currentTab.url)) {
      chrome.storage.sync.get(Config.DEFAULT_OPTIONS).then(async function (settings) {
        if (!settings.IIQES_Issues_ToggleVisibility) {
          log("IIQES_Issues_ToggleVisibility Not Enabled")
          return
        }
        await chrome.tabs.sendMessage(currentTab.id,
          {
            action: Message.IIQES_ISSUES_TOGGLEVISIBILITY
          })

      })
    }

  })


}, { urls: ["https://*.incidentiq.com/*"] })

// IIQES_TICKET_TITLE Feature
chrome.webRequest.onCompleted.addListener(function (details) {
  if (details.statusCode != 200)
    return

  chrome.storage.sync.get(Config.DEFAULT_OPTIONS).then((settings) => {
    if (!settings.IIQES_TICKET_TITLE) {
      log("IIQES_TICKET_TITLE Not Enabled")
      return
    }
    getCurrentTab().then(async function (currentTab) {
      if (!currentTab)
        return
      await chrome.tabs.sendMessage(currentTab.id,
        {
          action: Message.IIQES_TICKET_TITLE
        })
    })
  })
}, { urls: ["https://*.incidentiq.com/*"] })

async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}