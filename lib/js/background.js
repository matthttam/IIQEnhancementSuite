
let done = 0;

chrome.webRequest.onCompleted.addListener(function (details) {
  // check if the request URL matches the desired pattern
  if (details.url.includes('/api/v1.0/search/scan') && details.statusCode == 200) {
    getCurrentTab().then(function (currentTab) {
      checkFailedScan(currentTab.id)
    })
  }

}, { urls: ["<all_urls>"] });

async function checkFailedScan(tabID) {
  await chrome.tabs.sendMessage(tabID,
    {
      action: "CHECK"
    });
}

async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}