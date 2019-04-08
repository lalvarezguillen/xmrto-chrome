document.getElementById('parse').addEventListener('click', function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs){
    chrome.tabs.sendMessage(tabs[0].id, { action: "parse_page" }, function(response) {});
  });
});
