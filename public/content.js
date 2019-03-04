const btc_regex = /\b[123mn][a-km-zA-HJ-NP-Z0-9]{26,35}\b/g;
const pp_regexp = /(bitcoin:\?r=)?https:\/\/bitpay.com\/(invoice\?id=|i\/)\w+/;

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
    // check if current page has payment protocol and show notification
    if (pp_regexp.test(window.location.href)) {
      this.checkToS(this.runPaymentProtocol);
    }
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
      if (btc_regex.test(node.data)) {
        this.wrapMatchesInNode(node, btc_regex);
      }
      if (pp_regexp.test(node.data)) {
        this.wrapMatchesInNode(node, pp_regexp);
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
    temp.innerHTML = textNode.data.replace(regexp, '$&<button class="xmrtoButton" data-address="$&" title="Send money via XMR.to" /> ');
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
    const addressNodes = document.getElementsByClassName('xmrtoButton');
    this.appNodeCloseBtn.addEventListener('click', () => {
      this.appNode.style.display = 'none';
    });
    // add click listener for each xmr.to icon
    for (let i = 0; i < addressNodes.length; i++) {
      addressNodes[i].addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        const address = this.getAttribute('data-address');
        self.checkToS(function () {
          self.openAppWithAddress(address)
        });
      });
    }
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
    console.log(chrome.runtime.openOptionsPage);
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
  /**
   * Check if page url contain payment protocol and show notification if page support PP
   */
  runPaymentProtocol() {
    // shome chrome notification
    chrome.runtime.sendMessage({type: "notification", options: {
        type: 'basic',
        title: 'You can pay in Monero using XMR.TO',
        message: 'Fill in your "Contact & Refund Email" in bitpay dialog, and continue with XMR.to',
        iconUrl: 'images/icon128.png'
      }});
    setTimeout(() => {
      const appNode = document.getElementById('xmrtoapp');
      appNode.style.display = 'block';
      chrome.runtime.sendMessage({ type: "runApp", usePP: true, address: window.location.href });
    }, 500);
  }
}

const xmrApp = new RunXMRApp(document.body);