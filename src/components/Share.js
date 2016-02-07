import React from 'react';
import UUID from 'uuid';
import Api from '../lib/api';

const api = new Api();

export default React.createClass({
  propTypes: {
    canvasToPNG: React.PropTypes.func
  },
  getInitialState() {
    return {
      message: ''
    };
  },
  canvasToPNG(e) {
    if (typeof this.props.canvasToPNG === 'function') {
      return this.props.canvasToPNG();
    }
    return '';
  },
  saveToAPI(e) {
    e.preventDefault();
    const png = this.canvasToPNG().slice(22);
    const conferenceId = UUID.v4();
    if (png) {
      return api.post({ url: `/conferences/${conferenceId}/photos` }, png, { 'Content-Type': 'application/octet-stream' })
        .then((response) => {
          if (response.status > 204) {
            // @todo figure out error handling
            this.setState({ message: `failure status: ${response.status}` });
          }
          this.setState({ message: 'success' });
        })
        .catch((err) => {
          // @todo figure out error handling
          throw err;
        });
    }
  },
  render() {
    return (
      <div>
        <h3>Share</h3>
        <div>{this.state.message}</div>
        <button onClick={this.saveToAPI} className='button'>Share on Heroku</button>
        <button className='button'>Share on Twitter</button>
      </div>
    );
  }
});
