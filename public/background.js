window.chrome.runtime.onMessage.addListener(({ type, options, callback = () => {} }) => {
  if (type === "notification") {
    chrome.notifications.create('', options, callback);
  }
  if (type === "options") {
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    }
  }
});
