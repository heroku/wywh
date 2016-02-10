// transforms and orientation ids from:
//
// http://stackoverflow.com/questions/7584794/accessing-jpeg-exif-rotation-data-in-javascript-on-the-client-side/32490603#32490603
// http://stackoverflow.com/questions/20600800/js-client-side-exif-orientation-rotate-and-mirror-jpeg-images

const TRANSFORMS = [
  null,
  (ctx, width, height) => ctx.transform(1, 0, 0, 1, 0, 0),
  (ctx, width, height) => ctx.transform(-1, 0, 0, 1, width, 0),
  (ctx, width, height) => ctx.transform(-1, 0, 0, -1, width, height),
  (ctx, width, height) => ctx.transform(1, 0, 0, -1, 0, height),
  (ctx, width, height) => ctx.transform(0, 1, 1, 0, 0, 0),
  (ctx, width, height) => ctx.transform(0, 1, -1, 0, height, 0),
  (ctx, width, height) => ctx.transform(0, -1, -1, 0, height, width),
  (ctx, width, height) => ctx.transform(0, -1, 1, 0, 0, width)
];

export default (ctx, orientation, width, height) => {
  if (orientation === -1) {
    orientation = 1; // if unknown, make it normal
  }

  if (!TRANSFORMS[orientation]) {
    throw new Error(`Unknown orientation: ${orientation}`);
  }

  return TRANSFORMS[orientation](ctx, width, height);
};
