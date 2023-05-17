const targetNode = document.body;

chrome.storage.sync.get(Config.DEFAULT_OPTIONS).then((settings) => {
    if (settings.IIQES_Assets_CopyButtons) {
        const observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    for (const node of mutation.addedNodes) {
                        if (node.nodeType === Node.ELEMENT_NODE && node.hasAttribute('ng-if') && node.getAttribute('ng-if') === '$ctrl.Asset.AssetTag') {
                            console.log('Found target div:', node);
                            const elements = document.querySelectorAll('span[ng-bind="$ctrl.Asset.AssetTag"], span[ng-bind="$ctrl.Asset.SerialNumber"]');
                            elements.forEach((element) => {
                                const anchor = document.createElement('a');
                                anchor.className = 'btn btn-default btn-xs margin-left-10 top-n3 position-relative';
                                anchor.innerHTML = '<i class="fa fa-paperclip"></i><span class="copied-text"></span>';
                                anchor.setAttribute('uib-tooltip', 'Copy')
                                anchor.addEventListener('click', () => {
                                    const value = element.textContent;
                                    navigator.clipboard.writeText(value);
                                    const copiedText = anchor.querySelector('.copied-text');
                                    copiedText.innerText = 'Copied!';
                                    copiedText.style.textTransform = 'none';
                                    copiedText.style.paddingLeft = '5px'
                                    setTimeout(() => {
                                        copiedText.innerText = '';
                                        copiedText.style.paddingLeft = '0px'
                                    }, 3000);
                                });
                                element.parentNode.insertBefore(anchor, element.nextSibling);
                            });
                        }
                    }
                }
            }
        });
        observer.observe(targetNode, { childList: true, subtree: true });
    }
});
