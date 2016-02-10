import React from 'react';
import { Button } from 'react-bootstrap';

export default ({ onClick }) => (
  <div className='UploadBar clearfix'>
    <Button
      bsStyle='info'
      className='pull-right'
      onClick={onClick}
    >
      Share with Heroku
    </Button>
    <div className='UploadBar__instructions'>
      Share your selfie!
    </div>
  </div>
);
