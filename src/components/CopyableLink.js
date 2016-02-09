/* eslint-disable no-alert */

import React from 'react';
import Clipboard from 'react-zeroclipboard';
import { Input, Glyphicon, Button } from 'react-bootstrap';

export default ({ link }) => (
  <div className='clipboard'>
    <Input
      type='text'
      value={link}
      readOnly
      onClick={(e) => e.target.setSelectionRange(0, e.target.value.length)}
      addonBefore='Photo Link'
      buttonAfter={
        <Clipboard text={link} onAfterCopy={() => window.alert('Copied link to clipboard!')}>
          <Button><Glyphicon glyph='copy' /></Button>
        </Clipboard>
      }
    />
  </div>
);
