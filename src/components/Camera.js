import React from 'react';
import Share from './Share';
import attachMediaStream from 'attachmediastream';
import getUserMedia from 'getusermedia';

export default React.createClass({
  getInitialState() {
    return {
      videoVisible: 'block',
      canvasVisible: 'none',
      confImages: [{}],
      canvasPNG: ''
    };
  },
  componentDidMount() {
    this.initializeVideo();
  },
  componentWillMount() {
    this.setState({
      confImages: [{ id: 1, src: 'https://www.sparkpost.com/blog/wp-content/uploads/2015/06/HerokuLogo-624x251.png' }, { id: 2, src: 'https://d3k90kvix375hb.cloudfront.net/assets/connect/connect-logo-e18aa0d71ae466919801dd2c312239c3bb23849d9fc445c2227fe92ae40c861a.png' }]
    });
  },
  initializeVideo() {
    getUserMedia({ video: true, audio: false }, (err, stream) => {
      if (err) {
        return;
      }
      attachMediaStream(stream, this.videoEl);
    });
  },
  captureToggleVisibility() {
    this.setState({
      videoVisible: 'none',
      canvasVisible: 'block'
    });
  },
  cameraToggleVisibility() {
    this.setState({
      videoVisible: 'block',
      canvasVisible: 'none'
    });
  },
  captureVideoFrame(e) {
    e.preventDefault();
    const video = this.videoEl;
    const photo = this.photoCanvas;
    const context = photo.getContext('2d');
    photo.width = video.width;
    photo.height = video.height;
    this.captureToggleVisibility();
    context.drawImage(video, 0, 0, photo.width, photo.height);
  },
  canvasToPNG() {
    return this.photoCanvas.toDataURL('image/png');
  },
  render() {
    return (
      <div className='grid-flex-container'>
        <div className='grid-flex-cell camera'>
          <video width='640' height='480' style={{ display: this.state.videoVisible }} ref={(ref) => this.videoEl = ref} />
          <canvas style={{ display: this.state.canvasVisible }} ref={(ref) => this.photoCanvas = ref} />
          <button className='button button-warn' style={{ display: this.state.videoVisible }} onClick={this.captureVideoFrame}>Take Photo</button>
          <button className='button button-approve' style={{ display: this.state.canvasVisible }} onClick={this.cameraToggleVisibility}>Try Again</button>
        </div>
        <div className='grid-flex-cell grid-flex-cell-1of2 editor' style={{ display: this.state.canvasVisible }}>
          <h3>Draggable Images</h3>
          <ul>
            {this.state.confImages.map((image) => (
              <li key={image.id}>
                <img src={image.src} />
              </li>
            ))}
          </ul>
          <Share canvasToPNG={this.canvasToPNG} />
        </div>
      </div>
    );
  }
});
