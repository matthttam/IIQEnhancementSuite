const handleMutationSuccess = (mutation) => {
    log("handleMutationSuccess triggered")
    if (mutation.type === 'childList') {
        log("handleMutationSuccess triggered childList")
        Array.from(mutation.addedNodes)
            .filter(
                node =>
                    node.nodeType === Node.ELEMENT_NODE &&
                    node.hasAttribute('ng-bind') &&
                    node.getAttribute('ng-bind') === 'Data.SuccessMessage'
            )
            .forEach(node => {
                log("IIQES_BatchCheckIn_EnlargeText Triggered")

                const successLabel = node;
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

            });
    }
};

chrome.storage.sync.get(Config.DEFAULT_OPTIONS).then(settings => {
    if (!settings.IIQES_BatchCheckIn_EnlargeText) {
        return;
    }

    const targetLabel = document.querySelector('label[ng-bind="Data.SuccessMessage"]'); // Select the target label element

    if (targetLabel) {
        const targetNode = targetLabel.closest('.check-out-results'); // Traverse up the DOM tree to find the parent node
        if (targetNode) {
            const observer = new MutationObserver(mutationsList => {
                mutationsList.forEach(handleMutationSuccess);
            });
            observer.observe(targetNode, { childList: true });
            log("IIQES_BatchCheckIn_EnlargeText Loaded");
        } else {
            log("Target node not found. Please check the HTML structure.");
        }
    } else {
        log("Target label not found. Please check the HTML structure.");
    }
});

