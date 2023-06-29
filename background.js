// background.js

chrome.webRequest.onHeadersReceived.addListener(
    function (details) {
      const headers = details.responseHeaders;
      const contentTypeHeader = headers.find(header => header.name.toLowerCase() === 'content-type');
  
      if (contentTypeHeader && contentTypeHeader.value === 'image/webp') {
        contentTypeHeader.value = 'image/jpeg';
      }
  
      return { responseHeaders: headers };
    },
    { urls: ['<all_urls>'], types: ['image'] },
    ['blocking', 'responseHeaders']
  );
  