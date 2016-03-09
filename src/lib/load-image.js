/* eslint-disable arrow-body-style */
/* Load image, returning promise */

module.exports = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    if (!src.match(/^data:/)) {
      img.crossOrigin = 'Anonymous';
    }

    img.src = src;

    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Error loading image: ${src}`));
  });
};
