class Config {
    static DEFAULT_OPTIONS = {
        IIQES_RapidScan_Sounds: true,
        IIQES_Assets_CopyButtons: true,
        IIQES_BatchCheckIn_AutoFocus: true,
        IIQES_Issues_ToggleVisibility: true,
        IIQES_TICKET_TITLE: true
    }
}

class Message {
    static IIQES_RAPIDSCAN_SOUND = "IIQES_RAPIDSCAN_SOUND"
    static IIQES_BATCHCHECKIN_AUTOFOCUS = "IIQES_BATCHCHECKIN_AUTOFOCUS"
    static IIQES_ISSUES_TOGGLEVISIBILITY = "IIQES_ISSUES_TOGGLEVISIBILITY"
    static IIQES_SET_TICKET_TITLE = "IIQES_SET_TICKET_TITLE"
    static IIQES_RESTORE_TICKET_TITLE = "IIQES_RESTORE_TICKET_TITLE"
}

// Function to log messages with styling
function log(message, obj) {
    console.log(
        '[IIQES] %c' + message,  // String to format
        'color: #fff; background: #000667;', obj  // CSS styles
    );
}