const targetNode = document.body;

const addCopyButtonToElement = (element) => {
    // Check if a copy button has already been added to this element
    if (element.classList.contains('copied-button-added')) {
        return;
    }

    const anchor = document.createElement('a');
    anchor.className = 'btn btn-default btn-xs margin-left-10 top-n3 position-relative copied-button';
    anchor.innerHTML = '<i class="fa fa-paperclip"></i><span class="copied-text"></span>';
    anchor.setAttribute('uib-tooltip', 'Copy');
    anchor.addEventListener('click', () => {
        const value = element.textContent;
        navigator.clipboard.writeText(value);
        const copiedText = anchor.querySelector('.copied-text');
        copiedText.innerText = 'Copied!';
        copiedText.style.textTransform = 'none';
        copiedText.style.paddingLeft = '5px';
        setTimeout(() => {
            copiedText.innerText = '';
            copiedText.style.paddingLeft = '0px';
        }, 3000);
    });
    element.parentNode.insertBefore(anchor, element.nextSibling);
    // Add a class to mark this element as having a copy button added
    element.classList.add('copied-button-added');
    log("Added copy button", element)
};

const handleMutation = (mutation) => {
    if (mutation.type === 'childList') {

        Array.from(mutation.addedNodes)
            .filter(node => node.nodeType === Node.ELEMENT_NODE && node.hasAttribute('ng-if') && node.getAttribute('ng-if') === '$ctrl.Asset.AssetTag')
            .forEach(node => {
                console.group("IIQES_Assets_CopyButtons");
                const elements = document.querySelectorAll('span[ng-bind="$ctrl.Asset.AssetTag"], span[ng-bind="$ctrl.Asset.SerialNumber"]');
                elements.forEach(addCopyButtonToElement);
                console.groupEnd();
            });

    }
};

chrome.storage.sync.get(Config.DEFAULT_OPTIONS).then((settings) => {
    if (!settings.IIQES_Assets_CopyButtons) {
        return;
    }
    const observer = new MutationObserver((mutationsList) => {
        mutationsList.forEach(handleMutation);
    });
    observer.observe(targetNode, { childList: true, subtree: true });
    log("IIQES_Assets_CopyButtons Loaded");
});
