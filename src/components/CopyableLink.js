/* eslint-disable no-alert */

import React from 'react';
import { findDOMNode } from 'react-dom';
import Clipboard from 'clipboard';
import { Input, Glyphicon, Button, Tooltip, Overlay } from 'react-bootstrap';

export default React.createClass({
  getInitialState() {
    return { showTooltip: false, tooltipText: '' };
  },

  clearTooltip() {
    this.setState({ showTooltip: false });
  },

  setTooltip(text) {
    this.setState({ showTooltip: true, tooltipText: text });
  },

  componentDidMount() {
    const { clipboardBtn, clipboardInput } = this.refs;

    this.clipboard = new Clipboard(
      findDOMNode(clipboardBtn),
      { target: () => clipboardInput.refs.input }
    );

    this.clipboard.on('success', (e) => {
      e.clearSelection();
      this.setTooltip('Copied!');
      setTimeout(() => this.clearTooltip(), 1000);
    });

    this.clipboard.on('error', (e) => {
      this.setTooltip('Press Ctrl+C to copy');
    });
  },

  componentWillUnmount() {
    this.clipboard.destroy();
  },

  render() {
    const { link } = this.props;
    const { tooltipText, showTooltip } = this.state;

    return (
      <div>
        <div className='clipboard' ref='clipboard'>
          <Input
            ref='clipboardInput'
            type='text'
            value={link}
            label={'Shareable link to your photo:'}
            readOnly
            onClick={(e) => e.target.setSelectionRange(0, e.target.value.length)}
            onBlur={this.clearTooltip}
            buttonAfter={
              <Button ref='clipboardBtn'>
                <Glyphicon glyph='copy' />
              </Button>
            }
          />
          <Overlay
            placement='bottom'
            show={showTooltip}
            container={this.refs.clipboard}
          >
            <Tooltip id='clipboard-tooltip'>{tooltipText}</Tooltip>
          </Overlay>
        </div>
        <div className='clipboard-mobile'>
          <label className='control-label'>Shareable link to your photo:</label>
          <a href={link} className=''>{link}</a>
        </div>
      </div>
    );
  }
});
