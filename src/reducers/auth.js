import { AUTH_ERROR, ME_FETCH_START, ME_FETCH_SUCCESS } from '../actions/me';

const initialState = {
  isAuthenticated: null,
  isCheckingAuth: null,
  isGuest: null
};

export default (state = initialState, action) => {
  switch (action.type) {
  case ME_FETCH_START:
    return {
      ...state,
      isCheckingAuth: true
    };

  case ME_FETCH_SUCCESS:
    return {
      ...state,
      isAuthenticated: true,
      isCheckingAuth: false,
      isGuest: false
    };

  case AUTH_ERROR:
    return {
      ...state,
      isAuthenticated: false,
      isCheckingAuth: false
    };

  default:
    return state;
  }
};
