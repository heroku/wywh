/* (very basic) style support for drawing an image on a canvas with css */
/* assumes image is loaded already */

function notNull(val) {
  return val != null;
}

function parseDimension(dimension, val) {
  let match;

  if (!notNull(val)) {
    return undefined;
  }

  // left: 10
  if (Number(val) || Number(val) === 0) {
    return Number(val);
  }

  // left: '10px'
  match = val.trim().match(/^(\d+)px$/);
  if (match && match[1]) {
    return Number(match[1]);
  }

  // left: '10%'
  match = val.trim().match(/^(\d+)%$/);
  if (match && match[1]) {
    return dimension * Number(match[1]) / 100;
  }
}

function getArgs(canvas, img, style) {
  let width;
  let height;
  const ratio = img.naturalWidth / img.naturalHeight;
  let x, y;

  if (notNull(style.width) && notNull(style.height)) {
    width = parseDimension(canvas.width, style.width);
    height = parseDimension(canvas.height, style.height);
  } else if (notNull(style.width)) {
    width = parseDimension(canvas.width, style.width);
    height = width / ratio;
  } else if (notNull(style.height)) {
    height = parseDimension(canvas.height, style.height);
    width = height * ratio;
  } else {
    width = img.naturalWidth;
    height = img.naturalHeight;
  }

  if (notNull(style.left) && notNull(style.right)) {
    const x1 = parseDimension(canvas.width, style.left);
    const x2 = canvas.width - parseDimension(canvas.width, style.right);
    x = x1;
    width = x2 - x1;
  } else if (notNull(style.left)) {
    x = parseDimension(canvas.width, style.left);
  } else if (notNull(style.right)) {
    const x2 = canvas.width - parseDimension(canvas.width, style.right);
    x = x2 - width;
  }

  if (notNull(style.top) && notNull(style.bottom)) {
    const y1 = parseDimension(canvas.height, style.top);
    const y2 = canvas.height - parseDimension(canvas.height, style.bottom);
    y = y1;
    height = y2 - y1;
  } else if (notNull(style.top)) {
    y = parseDimension(canvas.height, style.top);
  } else if (notNull(style.bottom)) {
    const y2 = canvas.height - parseDimension(canvas.height, style.bottom);
    y = y2 - height;
  }

  return { x, y, width, height };
}

// const c = { width: 640, height: 480}
// const i = { naturalWidth: 100, naturalHeight: 20 }
// console.log(getArgs(c, i, { position: 'absolute', top: 0, left: 0}))
// console.log(getArgs(c, i, { position: 'absolute', right: 0, bottom: 0}))
// console.log(getArgs(c, i, { position: 'absolute', right: '10%', bottom: '10%', height: 50}))

export default function (canvas, img, style) {
  if (style.position !== 'absolute') {
    throw new Error('position must be absolute');
  }

  const { x, y, width, height } = getArgs(canvas, img, style);
  canvas.getContext('2d').drawImage(img, x, y, width, height);
}
