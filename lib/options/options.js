// Saves options to chrome.storage
const saveOptions = () => {
    const IIQES_RapidScan_Sounds = document.getElementById('IIQES_RapidScan_Sounds').checked;
    const IIQES_Assets_CopyButtons = document.getElementById('IIQES_Assets_CopyButtons').checked;
    const IIQES_BatchCheckIn_AutoFocus = document.getElementById('IIQES_BatchCheckIn_AutoFocus').checked;


    chrome.storage.sync.set(
        {
            IIQES_RapidScan_Sounds: IIQES_RapidScan_Sounds,
            IIQES_Assets_CopyButtons: IIQES_Assets_CopyButtons,
            IIQES_BatchCheckIn_AutoFocus: IIQES_BatchCheckIn_AutoFocus
        },
        () => {
            // Update status to let user know options were saved.
            const status = document.getElementById('status');
            status.textContent = 'Options saved.';
            status.style.opacity = '1';
            status.style.transition = 'opacity 0.3s ease-in-out';
            setTimeout(() => {
                status.style.opacity = '0';
                setTimeout(() => {
                    status.textContent = '';
                }, 300);
            }, 2000);
        }
    );
};

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const restoreOptions = () => {
    chrome.storage.sync.get(
        Config.DEFAULT_OPTIONS,
        (items) => {
            document.getElementById('IIQES_RapidScan_Sounds').checked = items.IIQES_RapidScan_Sounds;
            document.getElementById('IIQES_Assets_CopyButtons').checked = items.IIQES_Assets_CopyButtons;
            document.getElementById('IIQES_BatchCheckIn_AutoFocus').checked = items.IIQES_BatchCheckIn_AutoFocus;
        }
    );
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);