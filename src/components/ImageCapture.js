/* eslint-disable yoda */

import React from 'react';
import attachMediaStream from 'attachmediastream';
import getUserMedia from 'getusermedia';

import PhotoFrame from './PhotoFrame';
import { Input } from 'react-bootstrap';
import readOrientation from '../lib/read-orientation';
import setContextOrientation from '../lib/set-context-orientation';
import constrainDimensions from '../lib/constrain-dimensions';

export default React.createClass({
  propTypes: {
    handleImage: React.PropTypes.func
  },

  getInitialState() {
    return {
      error: null
    };
  },

  componentDidMount() {
    this.initializeVideo();
  },

  initializeVideo() {
    getUserMedia({ video: true, audio: false }, (error, stream) => {
      if (error) {
        return this.setState({ error });
      }

      this._stream = stream;
      attachMediaStream(stream, this._videoEl);
    });
  },

  componentWillUnmount() {
    if (this._stream) {
      for (const track of this._stream.getTracks()) {
        track.stop();
      }
    }
  },

  takeSnapshot(e) {
    e.preventDefault();

    if (this.props.handleImage) {
      const video = this._videoEl;
      const canvas = this._canvasEl;
      const context = canvas.getContext('2d');

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.scale(-1, 1);
      context.drawImage(video, -1 * canvas.width, 0);

      this.props.handleImage(canvas.toDataURL('image/png'));
    }
  },

  handleUpload(evInput) {
    const file = evInput.target.files[0];
    readOrientation(file, (orientation) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (evReader) => {
        const img = new Image();
        img.src = evReader.target.result;

        img.onload = () => {
          const canvas = this._canvasEl;
          const context = canvas.getContext('2d');

          const { width, height } = constrainDimensions(640, { width: img.width, height: img.height });

          if (5 <= orientation && orientation <= 8) {
            canvas.width = height;
            canvas.height = width;
          } else {
            canvas.width = width;
            canvas.height = height;
          }
          setContextOrientation(context, orientation, width, height);
          context.drawImage(img, 0, 0, width, height);
          setContextOrientation(context, 1);

          this.props.handleImage(canvas.toDataURL('image/png'));
        };
      };
    });
  },

  render() {
    return (
      <div className='ImageCapture'>
        <canvas style={{ display: 'none' }} ref={(ref) => this._canvasEl = ref}/>
        <PhotoFrame>
          {this.state.error &&
            <div className='ImageCapture__error clearfix'>
              <h3>There was an error enabling your webcam</h3>
              <h4>Why don't you upload an image instead?</h4>
              <div className='ImageCapture__error__file-input'>
                <Input type='file' onChange={this.handleUpload}/>
              </div>
            </div>
          }
          {!this.state.error &&
            <video className='ImageCapture__video' ref={(ref) => this._videoEl = ref} />
          }
        </PhotoFrame>
        <div>
          <button onClick={this.takeSnapshot} className='ImageCapture__button'>
            <span className='ImageCapture__button-label'>Take Photo!</span>
          </button>
        </div>
      </div>
    );
  }

});
