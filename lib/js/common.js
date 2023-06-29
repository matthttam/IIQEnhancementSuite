class Config {
    static DEFAULT_OPTIONS = {
        IIQES_RapidScan_Sounds: true,
        IIQES_Assets_CopyButtons: true,
        IIQES_BatchCheckIn_AutoFocus: true,
        IIQES_Issues_ToggleVisibility: true
    }
    static FEATURE_LOADED = {
        IIQES_RAPIDSCAN_SOUNDS: true,
        IIQES_ASSETS_COPYBUTTONS: true,
        IIQES_BATCHCHECKIN_AUTOFOCUS: true,
        IIQES_ISSUES_TOGGLEVISIBILITY: false
    }
}

class Message {
    static IIQES_RAPIDSCAN_SOUND = "IIQES_RAPIDSCAN_SOUND"
    static IIQES_BATCHCHECKIN_AUTOFOCUS = "IIQES_BATCHCHECKIN_AUTOFOCUS"
    static IIQES_ISSUES_TOGGLEVISIBILITY = "IIQES_ISSUES_TOGGLEVISIBILITY"
}

// Function to log messages with styling
function log(message, obj) {
    console.log(
        '[IIQES] %c' + message,  // String to format
        'color: #fff; background: #000667;', obj  // CSS styles
    );
}