element = document.querySelector('.feature-title');
if (element && element.textContent.includes('Create New Asset')) {
    //var audio = new Audio('boop.wav');
    //audio.play();
    console.log('playing sound')
    //alert(url)
    playSound()

}

async function createOffscreenDocument(offscreenDocumentPath) {
    url = chrome.runtime.getURL(offscreenDocumentPath)
    await chrome.offscreen.createDocument({
        url: url,
        reasons: ['AUDIO_PLAYBACK'],
        justification: 'Play a boop sound',
    });
}

function playSound() {
    offscreenDocumentPath = 'playsound_boop.html'
    createOffscreenDocument(offscreenDocumentPath)
    /*offscreenDocumentPath = 'playsound_boop.html'
    //url = chrome.runtime.getURL('playsound_boop.html')
    await chrome.offscreen.createDocument({
        url: chrome.runtime.getURL(offscreenDocumentPath),
        reasons: ['AUDIO_PLAYBACK'],
        justification: 'Play a boop sound',
    });
    alert('done')*/
    /*if (!(await hasOffscreenDocument(offscreenDocumentPath))) {
        await chrome.offscreen.createDocument({
            url: chrome.runtime.getURL(offscreenDocumentPath),
            reasons: ['AUDIO_PLAYBACK'],
            justification: 'Play a boop sound',
        });
    }*/
    /*if (!(await hasOffscreenDocument(offscreenDocumentPath))) {
        console.log('no offscreen document')
    } else {
        console.log('offscreen document')
    }
    console.log('closing offscreen document')
    chrome.offscreen.closeDocument()*/
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