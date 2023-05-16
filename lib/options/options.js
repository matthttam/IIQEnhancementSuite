
if ('undefined' === typeof window) {
    importScripts('./config.js');
}

// Saves options to chrome.storage
const saveOptions = () => {
    const IIQRS_SoundEffects = document.getElementById('IIQRS_SoundEffects').checked;
    const IIQAssets_CopyButtons = document.getElementById('IIQAssets_CopyButtons').checked;
    const IIQBatchChecKIn_AutoFocus = document.getElementById('IIQBatchChecKIn_AutoFocus').checked;


    chrome.storage.sync.set(
        {
            IIQRS_SoundEffects: IIQRS_SoundEffects,
            IIQAssets_CopyButtons: IIQAssets_CopyButtons,
            IIQBatchChecKIn_AutoFocus: IIQBatchChecKIn_AutoFocus
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
            document.getElementById('IIQRS_SoundEffects').checked = items.IIQRS_SoundEffects;
            document.getElementById('IIQAssets_CopyButtons').checked = items.IIQAssets_CopyButtons;
            document.getElementById('IIQBatchChecKIn_AutoFocus').checked = items.IIQBatchChecKIn_AutoFocus;
        }
    );
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);

window.addEventListener("load", (event) => {
    importScripts("./config.js")
});