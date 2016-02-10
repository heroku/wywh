import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import Conferences from './pages/Conferences';
import CreateSelfie from './pages/CreateSelfie';
import ViewPhoto from './pages/ViewPhoto';

export default (
  <Route path='/' component={App}>
    <Route path='/conferences' component={Conferences} />
    <Route path='/conferences/:conferenceId/selfie' component={CreateSelfie} />
    <Route path='/conferences/:conferenceId/photos/:photoId' component={ViewPhoto} />

    <IndexRoute component={Conferences} />
  </Route>
);
