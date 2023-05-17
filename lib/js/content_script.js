fail_filepath = chrome.runtime.getURL('lib/media/audio/boop.wav');
var failAudio = new Audio(fail_filepath);

valid_filepath = chrome.runtime.getURL('lib/media/audio/valid.mp3');
var validAudio = new Audio(valid_filepath);

// Handle messages from service worker
chrome.runtime.onMessage.addListener(
    function (message, sender, sendResponse) {
        if (message.action == Message.IIQES_RAPIDSCAN_SOUND) {
            IIQES_RAPIDSCAN_SOUND()
            return
        }

        if (message.action == Message.IIQES_BATCHCHECKIN_AUTOFOCUS) {
            IIQES_BATCHCHECKIN_AUTOFOCUS()
            return
        }
    }
);

// Trigger sound depending on scan success
function IIQES_RAPIDSCAN_SOUND() {
    element = document.querySelector('.feature-title');
    soundFile = valid_filepath
    if (element && element.textContent.includes('Create New Asset')) {
        failAudio.play();
    } else {
        validAudio.play();
    }
}

// Focus next field after scan
function IIQES_BATCHCHECKIN_AUTOFOCUS() {
    document.querySelector('input[ng-model="Data.SearchTerm"]').focus()
}