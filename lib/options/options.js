const getElementValue = (id) => document.getElementById(id).checked;

// Saves options to chrome.storage
const saveOptions = () => {
    const options = {
        IIQES_RapidScan_Sounds: getElementValue('IIQES_RapidScan_Sounds'),
        IIQES_Assets_CopyButtons: getElementValue('IIQES_Assets_CopyButtons'),
        IIQES_BatchCheckIn_AutoFocus: getElementValue('IIQES_BatchCheckIn_AutoFocus'),
        IIQES_BatchCheckIn_EnlargeText: getElementValue('IIQES_BatchCheckIn_EnlargeText')
    };

    chrome.storage.sync.set(options, () => {
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
    });
};

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const restoreOptions = () => {
    chrome.storage.sync.get(Config.DEFAULT_OPTIONS, (items) => {
        for (const [key, value] of Object.entries(items)) {
            if (document.getElementById(key)) {
                document.getElementById(key).checked = value;
            }
        }
    });
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
