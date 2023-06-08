(function () {

    let handleMutation = (mutation) => {
        // Check if the mutation occurred in the body
        if (mutation.target === document.body) {
            // Check if a <ul> tag with class "issues-list" is present
            const issueList = document.body.querySelector('ul.issues-list');
            if (issueList) {
                // Tag the ul for issueList with something so the custom CSS will apply to the children of that element
                issueList.classList.add('IIQES_issue-list')
                // Perform the desired action when the <ul> tag is found
                const issuesButtonRow = document.querySelector('div.select-all-toggle');
                if (issuesButtonRow) {
                    const toggleVisibilityButton = issuesButtonRow.querySelector('button[name="IIQES_Issues_ToggleIssueVisibility"]');
                    if (!toggleVisibilityButton) {
                        addToggleVisibilityButton(issuesButtonRow)
                    }
                }
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
        const observer = new MutationObserver((mutationsList) => {
            mutationsList.forEach(handleMutation);
        });

        let targetNode = document.body;
        let options = { childList: true, subtree: true }

        observer.observe(targetNode, options);
        log("IIQES_Issues_ToggleVisibility Loaded");
    });
})()