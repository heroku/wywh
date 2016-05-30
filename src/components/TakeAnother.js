import React from 'react';
import { Button } from 'react-bootstrap';

export default ({ onClick }) => (
    <div class='TakeAnother__button clearfix'>
        <Button
            bsStyle='info'
            className='pull-right'
            onclick={onClick}
        >
          Take another photo
        </Button>
        <div className='TakeAnother__instructions'>
          Take another photo
        </div>
    </div>
);
