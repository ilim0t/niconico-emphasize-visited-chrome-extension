chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const { url } = message;
    if (!url) {
        sendResponse(null)
        return true;
    }
    new Promise(resolve => chrome.history.getVisits({ url }, resolve))
        .then(results => {
            return results && results.length > 0;
        })
        .then(result => {
            sendResponse(result);
        });
    return true;
});