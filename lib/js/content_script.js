fail_filepath = chrome.runtime.getURL('lib/media/audio/boop.wav');
var failAudio = new Audio(fail_filepath);

valid_filepath = chrome.runtime.getURL('lib/media/audio/valid.mp3');
var validAudio = new Audio(valid_filepath);

// Handle messages from service worker
chrome.runtime.onMessage.addListener(
    function (message, sender, sendResponse) {
        if (message.action == Message.IIQES_RAPIDSCAN_SOUND) {
            log("IIQES_RAPIDSCAN_SOUND Triggered")
            IIQES_RAPIDSCAN_SOUND()
            return
        }

        if (message.action == Message.IIQES_BATCHCHECKIN_AUTOFOCUS) {
            log("IIQES_BATCHCHECKIN_AUTOFOCUS Triggered")
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
    if (document.activeElement.tagName !== "INPUT") {
        document.querySelector('input[ng-model="Data.SearchTerm"]').focus()
    } else {
        log("IIQES_BATCHCHECKIN_AUTOFOCUS suppressed because input is still focussed")
    }
}

function IIQES_BATCHCHECKIN_ENLARGETEXT() {
    successLabel = document.querySelector('h4.checkout-success')
    const successText = successLabel.textContent.trim();
    const nameRegex = /checked in from [\w\s]+ ([\w\s]+)\.\./;
    const match = successText.match(nameRegex);
    if (match && match.length > 1) {
        const name = match[1];
        const labelText = successText.replace(nameRegex, '');
        const nameLabel = document.createElement('span');
        nameLabel.textContent = name;
        nameLabel.style.fontSize = 'larger';
        nameLabel.style.fontWeight = 'bold';

        successLabel.innerHTML = labelText;
        successLabel.appendChild(nameLabel);

        log("Text modified."); // Log when the text is modified
    }

}