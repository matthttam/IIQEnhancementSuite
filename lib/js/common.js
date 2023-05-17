class Config {
    static DEFAULT_OPTIONS = {
        IIQES_RapidScan_Sounds: true,
        IIQES_Assets_CopyButtons: true,
        IIQES_BatchCheckIn_AutoFocus: true
    }
}

class Message {
    static IIQES_RAPIDSCAN_SOUND = "IIQES_RAPIDSCAN_SOUND"
    static IIQES_BATCHCHECKIN_AUTOFOCUS = "IIQES_BATCHCHECKIN_AUTOFOCUS"
}

function log(message) {
    console.log(
        '[IIQES] %c' + message,  // String to format
        // Each string is the CSS to apply for each consecutive %c
        'color: #fff; background: #000667;'                                               // Clear any styles
    );
}