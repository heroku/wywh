export const UPDATE_PHOTO = 'UPDATE_PHOTO';
export const CLEAR_PHOTO = 'CLEAR_PHOTO';
export const ADD_OVERLAY = 'ADD_OVERLAY';
export const REMOVE_OVERLAY = 'REMOVE_OVERLAY';
export const UPDATE_OVERLAY = 'UPDATE_OVERLAY';

export function updatePhoto(image) {
  return {
    type: UPDATE_PHOTO,
    payload: {
      image
    }
  };
}

export function clearPhoto() {
  return {
    type: CLEAR_PHOTO
  };
}

export function addOverlay(props) {
  return {
    type: ADD_OVERLAY,
    payload: {
      ...props
    }
  };
}

export function updateOverlay(index, props) {
  return {
    type: UPDATE_OVERLAY,
    payload: {
      index,
      overlay: {
        ...props
      }
    }
  };
}

export function removeOverlay(index) {
  return {
    type: REMOVE_OVERLAY,
    payload: {
      index
    }
  };
}
