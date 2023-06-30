function load_IIQES_ISSUES_TOGGLEVISIBILITY() {

    let handleBodyMutation = (mutation) => {
        // Check if the mutation occurred in the body
        if (mutation.target === document.body) {
            // Check if a <ul> tag with class "issues-list" is present and hasn't been updated with the IIQES_issue-list class
            const issueList = document.body.querySelectorAll('ul.issues-list:not(.IIQES_issue-list)');
            if (issueList) {
                // Tag the ul for issueList with something so the custom CSS will apply to the children of that element
                issueList.forEach(element => { element.classList.add('IIQES_issue-list') })
            }

            // Add visibility buttons to modals inside the select-all-toggle div
            const issuesButtonRowMissingVisibilityButton = document.querySelector('.modal-content div.select-all-toggle:not(:has(button[name="IIQES_Issues_ToggleIssueVisibility"]))')

            if (issuesButtonRowMissingVisibilityButton) {
                addToggleVisibilityButton(issuesButtonRowMissingVisibilityButton)
            }
        }
    }

    let handleTabMutation = (mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            // Get active tab pane that doesn't have the visibility button
            activeTabPaneNeedingButton = document.querySelector('.tab-content > .tab-pane.active:not(:last-child):not(:first-child):not(:has(button[name="IIQES_Issues_ToggleIssueVisibility"]))')
            if (activeTabPaneNeedingButton) {
                addToggleVisibilityButton(activeTabPaneNeedingButton)
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
        log("IIQES_Issues_ToggleVisibility Adding modal toggle visibility button")
    }

    function showIssues() {
        document.querySelector('ul.issues-list').querySelectorAll('li').forEach((li) => {
            li.classList.toggle('IIQES_show-issues');
        });
    }

    function registerBodyObserver() {
        const targetNode = document.querySelector('body:not(.IIQES_Issues_ToggleVisibility)');
        if (!targetNode)
            return
        const config = { childList: true, subtree: true };
        const bodyObserver = new MutationObserver((mutationsList) => {
            mutationsList.forEach(handleBodyMutation);
        });
        bodyObserver.observe(targetNode, config);
        targetNode.classList.add('IIQES_Issues_ToggleVisibility')
        log('IIQES_Issues_ToggleVisibility Triggered body registration')
    }

    function registerTabObserver() {
        // Select the target node
        const targetNode = document.querySelector('.tab-content:not(.IIQES_Issues_ToggleVisibility)');
        const config = { attributes: true, childList: true, subtree: true };

        // Check if the target node exists
        if (targetNode) {
            const tabObserver = new MutationObserver((mutationsList) => {
                mutationsList.forEach(handleTabMutation);
            });

            tabObserver.observe(targetNode, config);
            targetNode.classList.add('IIQES_Issues_ToggleVisibility')
            log('IIQES_Issues_ToggleVisibility Triggered tab registration')
        } else {
            // Retry registration after a delay if the target node is not yet present
            if (!document.querySelector('.tab-content.IIQES_Issues_ToggleVisibility'))
                setTimeout(registerTabObserver, 100);
        }
    }

    chrome.storage.sync.get(Config.DEFAULT_OPTIONS).then((settings) => {
        if (!settings.IIQES_Issues_ToggleVisibility) {
            return;
        }


        registerBodyObserver()
        registerTabObserver()

    });

}