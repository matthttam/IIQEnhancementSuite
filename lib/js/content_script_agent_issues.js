// Create a new mutation observer
const IIQES_IssuesObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        // Check if the mutation occurred in the body
        if (mutation.target === document.body) {
            // Check if a <ul> tag with class "issues-list" is present
            const issueList = document.body.querySelector('ul.issues-list');
            if (issueList) {
                log("IssueList Found");
                // Create the button element
                const button = document.createElement('button');
                button.type = 'button';
                button.className = 'btn btn-default btn-sm ng-scope';
                button.name = 'IIQES_Issues_ToggleIssueVisibility';
                button.textContent = 'Toggle Visibility';

                // Perform the desired action when the <ul> tag is found
                const selectAllToggle = document.querySelector('div.select-all-toggle');
                const selectAllToggleExistingButton = document.querySelector('div.select-all-toggle > button[name="IIQES_Issues_ToggleIssueVisibility"]');
                const tabContent = document.querySelector('.tab-content');
                const tabContentExistingButton = document.querySelector('.tab-content > button[name="IIQES_Issues_ToggleIssueVisibility"]');

                if (selectAllToggle && !selectAllToggleExistingButton) {
                    // Add the button as the first child of the select-all-toggle div
                    selectAllToggle.insertBefore(button, selectAllToggle.firstChild);
                    log("Adding modal toggle visibility button.")
                } else if (tabContent && !tabContentExistingButton) {
                    log("Adding tab-content toggle visibility button.")
                    tabContent.insertBefore(button, tabContent.firstChild);
                }
            }
        }
    });
});

// Start observing mutations
IIQES_IssuesObserver.observe(document.body, {
    childList: true,
    subtree: true,
});
