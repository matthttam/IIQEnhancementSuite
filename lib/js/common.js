class Config {
    static DEFAULT_OPTIONS = {
        IIQES_RapidScan_Sounds: true,
        IIQES_Assets_CopyButtons: true,
        IIQES_BatchCheckIn_AutoFocus: true,
        IIQES_Issues_ToggleVisibility: true
    }
}

class Message {
    static IIQES_RAPIDSCAN_SOUND = "IIQES_RAPIDSCAN_SOUND"
    static IIQES_BATCHCHECKIN_AUTOFOCUS = "IIQES_BATCHCHECKIN_AUTOFOCUS"
}

// Function to log messages with styling
function log(message, obj) {
    console.log(
        '[IIQES] %c' + message,  // String to format
        'color: #fff; background: #000667;', obj  // CSS styles
    );
}

async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}