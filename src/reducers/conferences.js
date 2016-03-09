import { CONFERENCES_FETCH_START, CONFERENCES_FETCH_SUCCESS } from '../actions/conferences';

const initialState = {
  sync: {
    fetching: false
  },
  records: []
};

export default (state = initialState, action) => {
  switch (action.type) {

  case CONFERENCES_FETCH_START:
    return {
      ...state,
      sync: {
        ...state.sync,
        fetching: true
      }
    };

  case CONFERENCES_FETCH_SUCCESS:
    return {
      ...state,
      sync: {
        ...state.sync,
        fetching: false
      },
      records: [...action.payload]
    };

  default:
    return state;

  }
};
