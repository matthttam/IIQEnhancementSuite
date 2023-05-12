fail_filepath = chrome.runtime.getURL('boop.wav');
var failAudio = new Audio(fail_filepath);

valid_filepath = chrome.runtime.getURL('valid.mp3');
var validAudio = new Audio(valid_filepath);

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        //if (request.trigger) {
        if (request.action == "CHECK") {
            element = document.querySelector('.feature-title');
            soundFile = valid_filepath
            if (element && element.textContent.includes('Create New Asset')) {
                failAudio.play();
            } else {
                validAudio.play();
            }
        }
    }
);