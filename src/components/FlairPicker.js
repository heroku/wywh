import React from 'react';
import { basic as BASIC_FLAIR } from '../flair';

// const req = require.context('../images/emoji/');
// const emoji = require('../lib/emoji-dict.json');

// c
//
// let FLAIR = [
//   'grinning', 'grimacing', 'joy', 'heart_eyes', 'blush', 'wave', 'raised_hands', 'point_up_2', 'eyes', 'kiss', 'crown', 'tophat', 'star', 'sparkles', 'fire', 'heart', 'purple_heart', 'blue_heart', 'speech_balloon', 'thought_balloon'
// ].map(key => { console.log(key, emoji[key].unicode +'.png'); return key }).map((key) => req(`./${emoji[key].unicode}.png`));
//
// FLAIR = FLAIR.concat(BASIC_FLAIR);
//
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
      </div>
    );
  }
});
