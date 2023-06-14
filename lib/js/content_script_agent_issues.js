(function () {

    let handleBodyMutation = (mutation) => {
        // Check if the mutation occurred in the body
        if (mutation.target === document.body) {
            // Check if a <ul> tag with class "issues-list" is present
            const issueList = document.body.querySelectorAll('ul.issues-list:not(.IIQES_issue-list)');
            const itemsList = document.body.querySelectorAll('ul.items-list:not(.IIQES_issue-list)');
            if (issueList) {
                // Tag the ul for issueList with something so the custom CSS will apply to the children of that element
                issueList.forEach(element => { element.classList.add('IIQES_issue-list') })
            }
            if (itemsList) {
                itemsList.forEach(element => { element.classList.add('IIQES_issue-list') })
            }
            // Perform the desired action when the <ul> tag is found
            const issuesButtonRowMissingVisibilityButton = document.querySelector('div.select-all-toggle:not(:has(button[name="IIQES_Issues_ToggleIssueVisibility"]))')

            if (issuesButtonRowMissingVisibilityButton) {
                addToggleVisibilityButton(issuesButtonRowMissingVisibilityButton)
            }
        }
    }

    function addToggleVisibilityButton(element) {
        // Create the button element
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'btn btn-default btn-sm ng-scope';
        button.name = 'IIQES_Issues_ToggleIssueVisibility';
        button.textContent = 'Toggle Visibility';
        button.addEventListener('click', showIssues);

        // Add the button as the first child of the select-all-toggle div
        element.insertBefore(button, element.firstChild);
        log("Adding modal toggle visibility button.")
    }

    function showIssues() {
        document.querySelector('ul.issues-list').querySelectorAll('li').forEach((li) => {
            li.classList.toggle('IIQES_show-issues');
        });
    }

    chrome.storage.sync.get(Config.DEFAULT_OPTIONS).then((settings) => {
        if (!settings.IIQES_Issues_ToggleVisibility) {
            return;
        }

        registerBodyObserver()
        registerTabObserver()
        log("IIQES_Issues_ToggleVisibility Loaded");
    });

    function registerBodyObserver() {
        const bodyObserver = new MutationObserver((mutationsList) => {
            mutationsList.forEach(handleBodyMutation);
        });

        bodyObserver.observe(document.body, { childList: true, subtree: true });
    }

    function registerTabObserver() {
        // Select the target node
        const targetNode = document.querySelector('.tab-content');

        // Check if the target node exists
        if (targetNode) {
            log('Triggered tab registration')
            // Options for the observer (specify the mutation types to observe)
            const config = { attributes: true, childList: true, subtree: true };

            // Callback function to execute when mutations are observed
            const callback = function (mutationsList, observer) {
                for (const mutation of mutationsList) {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                        // Get active tab pane that doesn't have the visibility button
                        activeTabPane = document.querySelector('.tab-content > .tab-pane.active:not(:last-child):not(:first-child):not(:has(button[name="IIQES_Issues_ToggleIssueVisibility"]))')
                        if (activeTabPane) {
                            console.log('Tab pane visible:', activeTabPane);
                            addToggleVisibilityButton(activeTabPane)
                        }
                    }
                }
            };

            // Create a new observer instance
            const observer = new MutationObserver(callback);

            // Start observing the target node for mutations
            observer.observe(targetNode, config);
        } else {
            // Retry registration after a delay if the target node is not yet present
            setTimeout(registerTabObserver, 100);
        }
    }
})()