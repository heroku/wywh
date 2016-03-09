/* eslint-disable arrow-body-style, no-console */

export const PHOTO_UPLOAD_START = 'PHOTO_UPLOAD_START';
export const PHOTO_UPLOAD_SUCCESS = 'PHOTO_UPLOAD_SUCCESS';
export const PHOTO_FETCH_SUCCESS = 'PHOTO_FETCH_SUCCESS';

import api from '../lib/api-wrapper';
import loadImage from '../lib/load-image';
import drawImageCSS from '../lib/draw-image-css';

import { fixed as FIXED_FLAIR } from '../flair';

function uploadStart() {
  return {
    type: PHOTO_UPLOAD_START
  };
}

function uploadSuccess(data) {
  return {
    type: PHOTO_UPLOAD_SUCCESS,
    payload: data
  };
}

function fetchSuccess(data) {
  return {
    type: PHOTO_FETCH_SUCCESS,
    payload: data
  };
}

export function fetch(id) {
  return (dispatch) => {
    return api
      .get(`/photos/${id}`)
      .then(({ data }) => dispatch(fetchSuccess([data])));
  };
}

export function rasterizeAndUpload(conferenceId) {
  return (dispatch, getState) => {
    const { photoBooth, conferences } = getState();
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const conference = conferences.records[0];

    if (!conference) {
      throw new Error(`Unknown conference ${conferenceId}`);
    }

    return loadImage(photoBooth.image).then((baseImage) => {
      // draw base image
      canvas.width = baseImage.width;
      canvas.height = baseImage.height;
      context.drawImage(baseImage, 0, 0);
    }).then(() => {
      // draw user overlays
      return Promise.all(photoBooth.overlays.map((overlay) => {
        return loadImage(overlay.src).then((img) => {
          context.drawImage(img, overlay.left, overlay.top);
        });
      }));
    }).then(() => {
      return Promise.all(FIXED_FLAIR.map((flair) => {
        return loadImage(flair.src).then((img) => {
          return drawImageCSS(canvas, img, flair.style);
        });
      }));
    }).then(() => {
      dispatch(uploadStart());
      return api.post(
        `/conferences/${conferenceId}/photos`,
        canvas.toDataURL('image/jpeg'),
        {
          headers: {
            'Content-Type': 'application/octet-stream'
          }
        }
      ).then(({ data }) => api.get(`/photos/${data.id}`))
       .then(({ data }) => dispatch(uploadSuccess(data)))
       .catch((err) => console.error(err));
    });
  };
}
