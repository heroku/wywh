import React from 'react';
import uploadingImage from '../images/emoji/1f365.png';
import uploadedImage from '../images/emoji/1f44c.png';

const Overlay = React.createClass({
  render() {
    const { uploading, uploaded } = this.props;

    return (
      <div className='UploadOverlay'>
        {uploading &&
          <div className='UploadOverlay__uploading'>
            <img src={uploadingImage} />
            <h2>uploading</h2>
          </div>
        }
        {!uploading && uploaded &&
          <div className='UploadOverlay__uploaded'>
            <img src={uploadedImage} />
            <h2>uploaded</h2>
          </div>
        }
      </div>
    );
  }
});

export default React.createClass({
  getInitialState() {
    return {
      uploading: this.props.uploading,
      uploaded: false
    };
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.uploading) {
      return this.setState({ uploading: true, uploaded: false });
    }

    if (this.props.uploading && !nextProps.uploading) {
      this.setState({ uploading: false, uploaded: true });

      setTimeout(() => {
        this.setState({ uploading: false, uploaded: false });
      }, 1000);
    }
  },

  render() {
    const { uploading, uploaded } = this.state;

    if (!uploading && !uploaded) {
      return null;
    }

    return (
      <Overlay uploading={this.state.uploading} uploaded={this.state.uploaded} />
    );
  }
});
