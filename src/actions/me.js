import Axios from 'axios';
import Config from 'config';

export const ME_FETCH_START = 'ME_FETCH_START';
export const ME_FETCH_SUCCESS = 'ME_FETCH_SUCCESS';
export const AUTH_ERROR = 'AUTH_ERROR';
export const AUTH_PRE_LOGIN = 'AUTH_PRE_LOGIN';
export const AUTH_PRE_LOGOUT = 'AUTH_PRE_LOGOUT';

const axios = Axios.create({
  baseURL: Config.apiUrl,
  withCredentials: true
});

function fetchStart() {
  return {
    type: ME_FETCH_START
  };
}

function fetchSuccess(me) {
  return {
    type: ME_FETCH_SUCCESS,
    payload: me
  };
}

function authError(error) {
  return {
    type: AUTH_ERROR,
    error
  };
}

function preLogin() {
  return {
    type: AUTH_PRE_LOGIN
  };
}

function preLogout() {
  return {
    type: AUTH_PRE_LOGOUT
  };
}

export function fetch() {
  return (dispatch) => {
    dispatch(fetchStart());
    return axios
      .get('/me')
      .then(
        (response) => dispatch(fetchSuccess(response.data)),
        (error) => dispatch(authError(error))
      );
  };
}

export function login(campaignId) {
  return (dispatch) => {
    dispatch(preLogin());
    window.location = `${Config.apiUrl}/login?redirect=${window.location}&c=${campaignId}`;
  };
}

export function logout() {
  return (dispatch) => {
    dispatch(preLogout());
    window.location = `${Config.apiUrl}/logout?redirect=${window.location}`;
  };
}
