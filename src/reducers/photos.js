import { PHOTO_UPLOAD_SUCCESS, PHOTO_FETCH_SUCCESS } from '../actions/photos';

function arrayToObject(arr, key) {
  return arr.reduce((result, item) => {
    result[item[key]] = item;
    return result;
  }, {});
}

export default (state = {}, action) => {
  switch (action.type) {
  case PHOTO_UPLOAD_SUCCESS:
    return {
      ...state,
      [action.payload.id]: action.payload
    };

  case PHOTO_FETCH_SUCCESS:
    return {
      ...state,
      ...arrayToObject(action.payload, 'id')
    };

  default:
    return state;
  }
};
