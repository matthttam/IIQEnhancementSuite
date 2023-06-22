(function () {


    const injectCSS = chrome.scripting.insertCSS({
        files: "lib/css/hide_issue_types.css",
        target
    })

    chrome.storage.sync.get(Config.DEFAULT_OPTIONS).then((settings) => {
        if (!settings.IIQES_Assets_CopyButtons) {
            return;
        }
        const observer = new MutationObserver((mutationsList) => {
            mutationsList.forEach(handleMutation);
        });

        const targetNode = document.body;
        const options = { childList: true, subtree: true }
        observer.observe(targetNode, options);

        log("IIQES_Assets_CopyButtons Loaded");
    });

})()