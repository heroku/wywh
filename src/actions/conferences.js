export const CONFERENCES_FETCH_SUCCESS = 'CONFERENCES_FETCH_SUCCESS';
export const CONFERENCES_FETCH_START = 'CONFERENCES_FETCH_START';

import api from '../lib/api-wrapper';

function fetchStart() {
  return {
    type: CONFERENCES_FETCH_START
  };
}

function fetchSuccess(conferences) {
  return {
    type: CONFERENCES_FETCH_SUCCESS,
    payload: conferences
  };
}

export function fetchAll() {
  return (dispatch) => {
    dispatch(fetchStart());
    return api
      .get(`/conferences`)
      .then(({ data }) => dispatch(fetchSuccess(data)));
  };
}
