import { PHOTO_UPLOAD_START, PHOTO_UPLOAD_SUCCESS } from '../actions/photos';

const initialState = {
  uploading: false,
  uploadError: false
};

export default (state = initialState, action) => {
  switch (action.type) {

  case PHOTO_UPLOAD_START:
    return {
      ...state,
      uploading: true,
      uploadError: false
    };

  case PHOTO_UPLOAD_SUCCESS:
    return {
      ...state,
      uploading: false,
      uploadError: false
    };

  default:
    return state;

  }
};
