import React from 'react';
import { Glyphicon } from 'react-bootstrap';

export default ({ href }) => (
  <a className='btn btn-primary' href={href} download='wywh.png'>
    <Glyphicon glyph='download'/>
    {' Download'}
  </a>
);
