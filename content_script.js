console.log("content_script loaded")

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        //if (request.trigger) {
        if (request.greeting === "hello") {
            (async () => {
                filePath = chrome.runtime.getURL(`boop.wav`);
                console.log(filePath)
                var audio = new Audio(filePath);
                audio.play();

                const response = await chrome.runtime.sendMessage({ greeting: "hello" });
                // do something with response here, not outside the function

            })();
        }

    }
);