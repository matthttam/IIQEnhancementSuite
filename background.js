
let done = 0;

chrome.webRequest.onCompleted.addListener(function (details) {
  // check if the request URL matches the desired pattern
  if (details.url.includes('/api/v1.0/search/scan') && details.statusCode == 200) {
    getCurrentTab().then(function (currentTab) {
      (async () => {
        response = await chrome.tabs.sendMessage(currentTab.id, { greeting: "hello" });
      })();

      /*chrome.scripting.executeScript({
        target: { tabId: currentTab.id },
        files: ["checkPage.js"],
      })
        .then(() => console.log("script injected"));*/
      //playsound_boop()
      //chrome.offscreen.closeDocument()
    })
  }
  /*
      async function playsound_boop() {
        offscreenDocumentPath = 'playsound_boop.html'
        await createOffscreenDocument(offscreenDocumentPath).then(function () {
          console.log("Offscreen Document Created.")
        })
      }
    }*/
}, { urls: ["<all_urls>"] });

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    console.log(sender.tab ?
      "from a content script:" + sender.tab.url :
      "from the extension");
    console.log(request)
    if (request.farewell === "goodbye")
      console.log('goodbye')
  }
);


async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

async function checkPage(tabID) {
  /*await chrome.tabs.executeScript(tabID, {
    code: `
      alert('current tab selected');
      `})*/
}

async function createOffscreenDocument(offscreenDocumentPath) {
  url = chrome.runtime.getURL(offscreenDocumentPath)
  await chrome.offscreen.createDocument({
    url: url,
    reasons: ['AUDIO_PLAYBACK'],
    justification: 'Play a boop sound',
  });
}

async function hasOffscreenDocument(path) {
  // Check all windows controlled by the service worker to see if one 
  // of them is the offscreen document with the given path
  const offscreenUrl = chrome.runtime.getURL(path);
  const matchedClients = await clients.matchAll();
  for (const client of matchedClients) {
    if (client.url === offscreenUrl) {
      return true;
    }
  }
  return false;
}

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}