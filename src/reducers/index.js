import { combineReducers } from 'redux';
import auth from './auth';
import me from './me';
import conferences from './conferences';
import photoBooth from './photoBooth';
import sync from './sync';
import photos from './photos';

export default combineReducers({
  auth,
  me,
  photoBooth,
  conferences,
  sync,
  photos
});
