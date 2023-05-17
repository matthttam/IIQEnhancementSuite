fail_filepath = chrome.runtime.getURL('lib/media/audio/boop.wav');
var failAudio = new Audio(fail_filepath);

valid_filepath = chrome.runtime.getURL('lib/media/audio/valid.mp3');
var validAudio = new Audio(valid_filepath);

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        chrome.storage.sync.get(Config.DEFAULT_OPTIONS).then((settings) => {
            console.log(settings)
            console.log('here')
            if (request.action == Config.RAPIDSCAN_CHECK && settings.IIQRS_SoundEffects) {

                element = document.querySelector('.feature-title');
                soundFile = valid_filepath
                if (element && element.textContent.includes('Create New Asset')) {
                    failAudio.play();
                } else {
                    validAudio.play();
                }
            } else if (request.action == Config.FOCUS_DEVICE_TEXTBOX && settings.IIQBatchChecKIn_AutoFocus) {
                document.querySelector('input[ng-model="Data.SearchTerm"]').focus()
            }
        })
    }
);
