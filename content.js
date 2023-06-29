// content.js

function convertWebpImages() {
    const webpImages = document.querySelectorAll('img[src$=".webp"]');
    webpImages.forEach((img) => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      const image = new Image();
  
      image.src = img.src;
      image.onload = function () {
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0);
        img.src = canvas.toDataURL('image/jpeg');
      };
    });
  }
  
  // Convert WebP images on page load
  convertWebpImages();
  
  // Convert WebP images added dynamically
  const observer = new MutationObserver(function (mutationsList) {
    for (let mutation of mutationsList) {
      if (mutation.type === 'childList') {
        const addedImages = mutation.addedNodes;
        addedImages.forEach(function (addedImage) {
          if (addedImage instanceof HTMLImageElement && addedImage.src.endsWith('.webp')) {
            convertWebpImages();
          }
        });
      }
    }
  });
  
  observer.observe(document.body, { childList: true, subtree: true });
  