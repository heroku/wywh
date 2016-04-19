/* We need to disable global scrolling while a user is dragging an element,
 * so this module handles that as it needs to be done in one place
 */

let scrollingDisabled = false;

const preventScroll = (e) => e.preventDefault();

export function disableGlobalScroll() {
  if (!scrollingDisabled) {
    scrollingDisabled = true;
    document.addEventListener('touchmove', preventScroll, false);
  }
}

export function enableGlobalScroll() {
  if (scrollingDisabled) {
    scrollingDisabled = false;
    document.removeEventListener('touchmove', preventScroll, false);
  }
}
