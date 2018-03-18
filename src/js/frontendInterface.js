let isInjected;
if (!isInjected) {
  console.log('ISINJECTED', true);
  isInjected = true;
  init();
} else {
  alert('IT HAPPEND!')
}

function init() {
  function onJiraRequest(ev) {
    console.log('Content Script Jira Request ---');
    
    chrome.runtime.sendMessage({
      action: 'JIRA_REQUEST',
      source: ev.detail
    });
  }

  chrome.runtime.onMessage.addListener((request) => {
    const ev = new CustomEvent('SP_JIRA_RESPONSE', {
      detail: request,
    });
    window.dispatchEvent(ev);
  });

  window.addEventListener('SP_JIRA_REQUEST', onJiraRequest);

// set permanent info for frontend
  window.localStorage.setItem('SUPER_PRODUCTIVITY_CHROME_EXTENSION', 'IS_ENABLED');

  const initEv = new Event('SP_EXTENSION_READY');
  window.dispatchEvent(initEv);
// dispatch again just in case the page was not loaded yet
  setTimeout(() => {
    window.dispatchEvent(initEv);
  }, 3000);
  setTimeout(() => {
    window.dispatchEvent(initEv);
  }, 10000);
}
