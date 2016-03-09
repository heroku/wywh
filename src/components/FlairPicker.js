import React from 'react';
import { basic as BASIC_FLAIR } from '../flair';

const FLAIR = BASIC_FLAIR.map((f) => f.src);

export default React.createClass({
  handleDragStart(e, src) {
    const targetPos = e.target.getBoundingClientRect();
    e.dataTransfer.setData('text', JSON.stringify({
      flair: src,
      offsetX: targetPos.left - e.clientX,
      offsetY: targetPos.top - e.clientY
    }));
  },

  render() {
    return (
      <div className='FlairPicker'>
        <h3>Add some flair</h3>
        {FLAIR.map((src) => (
          <img
            key={src}
            src={src}
            className='FlairPicker__flair'
            draggable
            onDragStart={(e) => this.handleDragStart(e, src)}
            onClick={() => this.props.onAddOverlay({ src, left: 10, top: 10 })}
          />
        ))}
        <div className='FlairPicker__license'>
          Emoji provided free by <a href='http://emojione.com'>Emoji One</a>.
        </div>
      </div>
    );
  }
});
