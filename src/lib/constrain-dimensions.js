/* eslint-disable no-else-return */

export default (size, { width, height }) => {
  if (width <= size && height <= size) {
    return { width, height };
  }

  if (width >= height) {
    return {
      width: size,
      height: (size / width) * height
    };
  } else {
    return {
      height: size,
      width: (size / height) * width
    };
  }
};
