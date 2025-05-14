(function () {
    const addCopyButtonToElement = (element) => {
        // Check if a copy button has already been added to this element
        if (element.classList.contains('copied-button-added')) {
            return;
        }

        const anchor = document.createElement('a');
        anchor.className = 'btn btn-default btn-xs margin-left-10 top-n3 position-relative copied-button';
        anchor.innerHTML = '<i class="fa fa-paperclip"></i><span class="copied-text">Copied!</span>';
        anchor.setAttribute('uib-tooltip', 'Copy');

        // Inline styles to support transition behavior
        anchor.style.display = 'inline-flex';
        anchor.style.alignItems = 'center';
        anchor.style.overflow = 'hidden';
        anchor.style.whiteSpace = 'nowrap';
        anchor.style.maxWidth = '34px';
        anchor.style.transition = 'max-width 0.3s ease';
        anchor.style.minWidth = '14.125px';

        const copiedText = anchor.querySelector('.copied-text');
        copiedText.style.opacity = '0';
        copiedText.style.transition = 'opacity 0.3s ease, padding-left 0.3s ease';
        copiedText.style.paddingLeft = '0';
        copiedText.style.textTransform = 'none';

        anchor.addEventListener('click', () => {
            const value = element.textContent;
            navigator.clipboard.writeText(value);

            // Expand button
            anchor.style.maxWidth = '120px';
            copiedText.style.opacity = '1';
            copiedText.style.paddingLeft = '5px';

            setTimeout(() => {
                // Collapse button
                copiedText.style.opacity = '0';
                copiedText.style.paddingLeft = '0px';
                anchor.style.maxWidth = '34px';
            }, 3000);
        });

        element.parentNode.insertBefore(anchor, element.nextSibling);
        // Add a class to mark this element as having a copy button added
        element.classList.add('copied-button-added');
        log("Added copy button", element)
    };

    const scanAndAddButtons = () => {
        const elements = document.querySelectorAll(
            'span[ng-bind="$ctrl.Asset.AssetTag"]:not(.copied-button-added), span[ng-bind="$ctrl.Asset.SerialNumber"]:not(.copied-button-added)'
        );
        console.group("IIQES_Assets_CopyButtons");
        elements.forEach(addCopyButtonToElement);
        console.groupEnd();
    };

    const debounce = (func, wait) => {
        let timeout;
        return () => {
            clearTimeout(timeout);
            timeout = setTimeout(func, wait);
        };
    };

    chrome.storage.sync.get(Config.DEFAULT_OPTIONS).then((settings) => {
        if (!settings.IIQES_Assets_CopyButtons) {
            return;
        }

        const observer = new MutationObserver(debounce(scanAndAddButtons, 250));
        observer.observe(document.body, { childList: true, subtree: true });

        // Safety net: Try once after page load as well
        window.addEventListener('load', () => {
            setTimeout(scanAndAddButtons, 1000);
        });

        log("IIQES_Assets_CopyButtons Loaded");
    });

})()