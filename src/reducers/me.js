import { AUTH_ERROR, ME_FETCH_SUCCESS } from '../actions/me';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
  case AUTH_ERROR:
    return {};

  case ME_FETCH_SUCCESS:
    return { ...action.payload };

  default:
    return state;
  }
};
