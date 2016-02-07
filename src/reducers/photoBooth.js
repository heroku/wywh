import { UPDATE_PHOTO, CLEAR_PHOTO, ADD_OVERLAY, REMOVE_OVERLAY, UPDATE_OVERLAY } from '../actions/photoBooth';

const initialState = {
  image: null,
  overlays: []
};

function addOverlay(overlays, payload) {
  return [
    ...overlays,
    {
      src: payload.src,
      left: payload.left || 10,
      top: payload.top || 10
    }
  ];
}

function removeOverlay(overlays, payload) {
  return [
    ...overlays.slice(0, payload.index),
    ...overlays.slice(payload.index + 1)
  ];
}

function updateOverlay(overlays, payload) {
  return [
    ...overlays.slice(0, payload.index),
    {
      ...overlays[payload.index],
      ...payload.overlay
    },
    ...overlays.slice(payload.index + 1)
  ];
}

export default (state = initialState, action) => {
  switch (action.type) {

  case UPDATE_PHOTO:
    return {
      ...state,
      image: action.payload.image
    };

  case CLEAR_PHOTO:
    return {
      ...state,
      image: null,
      overlays: []
    };

  case ADD_OVERLAY:
    return {
      ...state,
      overlays: addOverlay(state.overlays, action.payload)
    };

  case UPDATE_OVERLAY:
    return {
      ...state,
      overlays: updateOverlay(state.overlays, action.payload)
    };

  case REMOVE_OVERLAY:
    return {
      ...state,
      overlays: removeOverlay(state.overlays, action.payload)
    };

  default:
    return state;

  }
};
