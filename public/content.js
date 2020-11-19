const btc_regex = /\b[123mn][a-km-zA-HJ-NP-Z0-9]{26,35}\b/g;

function removeElementsByClass(className){
  const elements = document.getElementsByClassName(className);
  while(elements.length > 0){
    elements[0].parentNode.removeChild(elements[0]);
  }
}

class RunXMRApp {
  constructor(target) {
    this.target = target;
    // create appNode to render react application
    this.createAppContainer();
    // parse HTML, find monero addresses and add button to open modal window
    this.injectIcon(this.target);
    // create iframe in appNode, render react app into iframe
    this.renderReactApp(this.target);
    // add event listeners to open/close modal window
    this.addListeners();
    chrome.runtime.onMessage.addListener(
      (request) => {
        if (request.action === "parse_page") {
          removeElementsByClass('xmrtoButton');
          this.injectIcon(this.target);
        }
      });
  }

  /**
   * create appNode to render react application
   */
  createAppContainer() {
    // Container for app iframe
    this.appNode = document.createElement('div');
    this.appNode.id = "xmrtoapp";

    // Close button for app iframe
    this.appNodeCloseBtn = document.createElement('div');
    this.appNodeCloseBtn.id = "xmrtoapp-close";
    this.appNodeCloseBtn.innerHTML = '&times;';
    this.appNode.appendChild(this.appNodeCloseBtn);
  }
  /**
   * create appNode to render react application
   * @param {node} node - root HTML element of the app
   */
  injectIcon(node) {
    let next;
    if (node.nodeType === 1) {
      // (Element node)
      if (node = node.firstChild) {
        do {
          // Recursively call injectIcon
          // on each child node
          next = node.nextSibling;
          this.injectIcon(node);
        } while(node = next);
      }
    } else if (node.nodeType === 3) {
      // (Text node)
      if (btc_regex.test(node.data) && node.parentNode.nodeName !== 'NOSCRIPT') {
        this.wrapMatchesInNode(node, btc_regex);
      }
    }
  }
  /**
   * Get html element with monero address and add button to open modal dialog
   * @param {node} textNode - HTML element that contain monero address
   * @param {regExp} regexp - regexp for monero address
   */
  wrapMatchesInNode(textNode, regexp) {
    const temp = document.createElement('div');
    temp.innerHTML = textNode.data.replace(regexp, '$&<button class="xmrtoButton" data-address="$&" title="Pay bitcoin in monero"></button>');
    // Extract produced nodes and insert them
    // before original textNode:
    while (temp.firstChild) {
      textNode.parentNode.insertBefore(temp.firstChild, textNode);
    }
    // Remove original text-node:
    textNode.parentNode.removeChild(textNode);
  }
  /**
   * create iframe in appNode, render react app into iframe
   * @param {node} target - root HTML element of the app
   */
  renderReactApp(target) {
    // create iframe for the app to isolate css
    const frame = document.createElement('iframe');
    frame.id = 'xmrtoapp-iframe';
    const extensionOrigin = 'chrome-extension://' + chrome.runtime.id;
    if (!location.ancestorOrigins.contains(extensionOrigin)) {
      frame.src = chrome.runtime.getURL('index.html');
      // append app container to app root node
      target.appendChild(this.appNode);
      // append iframe to app container
      this.appNode.appendChild(frame);
    }
  }
  /**
   * add event listeners to open/close modal window
   */
  addListeners() {
    const self = this;
    this.appNodeCloseBtn.addEventListener('click', () => {
      this.appNode.style.display = 'none';
    });
    // add click listener for each xmr.to icon
    document.addEventListener('click', function(e) {
      let target = e.target;
      if (target.className.includes('xmrtoButton')) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        const address = target.getAttribute('data-address');
        self.checkToS(function () {
          self.openAppWithAddress(address)
        });
      }
    });
  }

  /**
   * Check if user agreed with ToS
   * @param {function} callback - callback that fires if user agreed with ToS
   */
  checkToS(callback) {
    chrome.storage.sync.get({
      agree: false
    }, (items) => {
      if (items.agree) {
        callback();
      } else {
        this.showOptions();
      }
    });
  }

  /**
   * Show options
   */
  showOptions() {
    chrome.runtime.sendMessage({type: "options"});
  }
  /**
   * open modal window. Add display block to appNode. Send message with address to react app
   * @param {string} address - monero address. Can be empty
   */
  openAppWithAddress(address) {
    const appNode = document.getElementById('xmrtoapp');
    appNode.style.display = 'block';
    chrome.runtime.sendMessage({ type: "runApp", address });
  }
}

window.addEventListener("message", (event) => {
  if (event.data.type === 'resize') {
    const iframe = document.getElementById('xmrtoapp-iframe');
    iframe.style.height = `${event.data.data.height}px`;
  }
}, false);

const xmrApp = new RunXMRApp(document.body);
