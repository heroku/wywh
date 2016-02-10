import React from 'react';
import { DraggableCore } from 'react-draggable';

const removeEmoji = require('../images/emoji/274c.png');

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
    const vals = {
      left: overlay.left + (position.clientX - startX) / dragScale,
      top: overlay.top + (position.clientY - startY) / dragScale
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
        onStop={this.handleStop}
      >
        <img ref={(el) => this._image = el} src={!this.state.isWithinBounds ? removeEmoji : overlay.src} draggable={false} style={this.getStyle()}/>
      </DraggableCore>
    );
  }
});
