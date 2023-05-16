fail_filepath = chrome.runtime.getURL('lib/media/boop.wav');
var failAudio = new Audio(fail_filepath);

valid_filepath = chrome.runtime.getURL('lib/media/valid.mp3');
var validAudio = new Audio(valid_filepath);

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        chrome.storage.sync.get(null).then((settings) => {
            if (request.action == "CHECK" && settings.IIQRS_SoundEffects) {

                element = document.querySelector('.feature-title');
                soundFile = valid_filepath
                if (element && element.textContent.includes('Create New Asset')) {
                    failAudio.play();
                } else {
                    validAudio.play();
                }
            }
        })
    }
);
