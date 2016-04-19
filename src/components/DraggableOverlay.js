import React from 'react';
import { DraggableCore } from 'react-draggable';
import { enableGlobalScroll, disableGlobalScroll } from '../lib/ios-scrolling';

const removeEmoji = require('../images/emoji/274c.png');

const isUndefined = (val) => {
  return typeof val === 'undefined';
};

export default React.createClass({
  getInitialState() {
    return {
      startX: 0,
      startY: 0,
      x: 0,
      y: 0,
      isWithinBounds: true,
      isDragging: false
    };
  },

  componentWillUnmount() {
    this._unmounted = true;
    // in case we get an unmount while dragging, i.e. the image is removed
    // ensure we reset scrolling
    if (this.state.isDragging) {
      enableGlobalScroll();
    }
  },

  getStyle() {
    const { startX, startY, x, y } = this.state;
    const { overlay, dragScale } = this.props;

    const translateX = (x - startX) / dragScale;
    const translateY = (y - startY) / dragScale;

    return {
      position: 'absolute',
      left: overlay.left,
      top: overlay.top,
      transform: `translate(${translateX}px, ${translateY}px)`
    };
  },

  getNewPosition(position) {
    const { overlay, dragScale } = this.props;
    const { startX, startY } = this.state;
    // sometimes (ios?) clientX is omitted on the touchEnd event
    const pos = {
      x: isUndefined(position.clientX) ? position.lastX : position.clientX,
      y: isUndefined(position.clientY) ? position.lastY : position.clientY
    };

    const vals = {
      left: overlay.left + (pos.x - startX) / dragScale,
      top: overlay.top + (pos.y - startY) / dragScale
    };
    vals.bottom = vals.top + this._image.height;
    vals.right = vals.left + this._image.width;
    return vals;
  },

  handleStop(e, { position }) {
    this.props.onMoved(this.getNewPosition(position));
    if (!this._unmounted) {
      this.setState(this.getInitialState());
    }
  },

  render() {
    const { overlay } = this.props;

    return (
      <DraggableCore
        onStart={(e, { position }) => {
          disableGlobalScroll();
          if (this.state.isDragging) {
            return;
          }
          this.setState({
            startX: position.clientX,
            startY: position.clientY,
            x: position.clientX,
            y: position.clientY,
            isDragging: true
          });
        }}
        onDrag={(e, { position }) => {
          this.setState({
            x: position.clientX,
            y: position.clientY,
            isWithinBounds: this.props.checkInBounds(this.getNewPosition(position))
          });
        }}
        onStop={(...args) => {
          enableGlobalScroll();
          this.handleStop(...args);
        }}
      >
        <img ref={(el) => this._image = el} src={!this.state.isWithinBounds ? removeEmoji : overlay.src} draggable={false} style={this.getStyle()}/>
      </DraggableCore>
    );
  }
});
