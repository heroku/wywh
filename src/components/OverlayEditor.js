/* eslint-disable no-empty */

import React from 'react';
import DraggableOverlay from './DraggableOverlay';
import PhotoFrame from './PhotoFrame';

import { fixed as FIXED_FLAIR } from '../flair';

export default React.createClass({
  propTypes: {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    image: React.PropTypes.string,
    overlays: React.PropTypes.array
  },

  getInitialState() {
    return {
      scale: 1
    };
  },

  updateImageScale() {
    if (this._baseImage.width && this._baseImage.naturalWidth) {
      this.setState({
        naturalWidth: this._baseImage.naturalWidth,
        naturalHeight: this._baseImage.naturalHeight,
        scale: this._baseImage.width / this._baseImage.naturalWidth
      });
    }
  },

  componentDidMount() {
    this.updateImageScale();
    window.addEventListener('resize', this.updateImageScale);
    this._baseImage.addEventListener('load', this.updateImageScale);
  },

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateImageScale);
    this._baseImage.removeEventListener('load', this.updateImageScale);
  },

  handleDrop(e) {
    try {
      const data = JSON.parse(e.dataTransfer.getData('text'));
      const dropLocation = this._baseImage.getBoundingClientRect();
      const { scale } = this.state;

      if (data.flair) {
        this.props.onAddOverlay({
          src: data.flair,
          left: (e.clientX - dropLocation.left) / scale + (data.offsetX || 0),
          top: (e.clientY - dropLocation.top) / scale + (data.offsetY || 0)
        });
      }
    } catch (err) {
    }
  },

  checkInBounds(attrs) {
    return !(
      attrs.right < 0 ||
      attrs.bottom < 0 ||
      attrs.left > this.state.naturalWidth ||
      attrs.top > this.state.naturalHeight
    );
  },

  handleOverlayMoved(i, attrs) {
    if (!this.checkInBounds(attrs)) {
      this.props.onRemoveOverlay(i);
    } else {
      this.props.onMoveOverlay(i, attrs);
    }
  },

  render() {
    const containerStyle = {
      position: 'relative'
    };

    const baseImageStyle = {
      maxWidth: '100%',
      width: '100%'
    };

    const { image, overlays } = this.props;
    const { scale, naturalWidth, naturalHeight } = this.state;

    const overlayWrapperStyle = {
      position: 'absolute',
      top: 0,
      left: 0,
      width: naturalWidth,
      height: naturalHeight,
      transform: `scale(${scale})`,
      transformOrigin: '0 0'
    };

    return (
      <PhotoFrame>
        <div style={containerStyle}
          onDragEnter={(e) => e.preventDefault()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => this.handleDrop(e)}
        >
          <img src={image} style={baseImageStyle} ref={(el) => this._baseImage = el} />
          <div style={overlayWrapperStyle}>
            {overlays.map((overlay, i) => (
              <DraggableOverlay
                key={i}
                overlay={overlay}
                onMoved={(attrs) => this.handleOverlayMoved(i, attrs)}
                checkInBounds={this.checkInBounds}
                dragScale={scale}
              />
            ))}
            {FIXED_FLAIR.map((item) => (
              <img key={item.src} src={item.src} style={item.style} />
            ))}
          </div>
        </div>
      </PhotoFrame>
    );
  }
});
