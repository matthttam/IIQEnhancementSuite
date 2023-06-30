(function () {
    let previousTitle = "";
    let previousHref = "";
    let modifiedTitle = "";

    const observeUrlChange = () => {
        previousHref = document.location.href;

        IIQES_TICKET_TITLE_FEATURE()
        const body = document.querySelector("body");
        const observer = new MutationObserver(mutations => {
            if (previousHref !== document.location.href) {
                log('Previous href was: ' + previousHref)
                previousHref = document.location.href;
                IIQES_TICKET_TITLE_FEATURE()
            }

        });
        observer.observe(body, { childList: true, subtree: true });
    };

    window.onload = observeUrlChange;

    function IIQES_TICKET_TITLE_FEATURE() {
        // IIQES_TICKET_TITLE Feature
        const currentURL = window.location.href;
        const ticketDetectionPattern = new RegExp("^https:\/\/.*\.incidentiq\.com\/(agent\/.*flyout-type=agent-ticket|agent\/tickets\/[a-fA-F0-9-]+$)");

        let isTicketURL = ticketDetectionPattern.test(currentURL);


        chrome.storage.sync.get(Config.DEFAULT_OPTIONS).then(async function (settings) {
            if (!settings.IIQES_TICKET_TITLE) {
                log("IIQES_TICKET_TITLE Not Enabled");
                return;
            }

            if (isTicketURL) {
                IIQES_SET_TICKET_TITLE();
            } else {
                if (previousTitle && document.location.href === previousHref && document.title == modifiedTitle) {
                    log('Setting previous title to: ' + previousTitle)
                    document.title = previousTitle;
                    previousTitle = ""
                }
            }
        });
    }

    var retryCount = 0;
    const maxRetries = 20;

    function IIQES_SET_TICKET_TITLE() {
        // Get ticket # from DOM
        const ticketNumber = document.querySelector('div.ticket-detail span[ng-bind="$ctrl.Ticket.TicketNumber"]')?.textContent
        if (!ticketNumber) {
            if (retryCount < maxRetries) {
                retryCount++;
                log('Ticket # not found. Retrying in 100ms...');
                setTimeout(IIQES_SET_TICKET_TITLE, 100);
                return;
            }
            log('Maximum retries reached. Ticket # not found.');
            return;
        }

        // Set title
        previousTitle = document.title;
        log('Setting previous title to: ' + previousTitle)
        modifiedTitle = document.title.replace("Incident IQ", "IIQ | " + ticketNumber);
        document.title = modifiedTitle
    }
})();