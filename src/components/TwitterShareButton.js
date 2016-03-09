import React from 'react';

export default React.createClass({
  componentDidMount() {
    window.twttr.widgets.load(this.refs.link);
  },

  render() {
    return (
      <a
        ref='link'
        href='https://twitter.com/share'
        className='twitter-share-button'
        data-url={this.props.shareUrl}
        data-text={this.props.shareText}
        data-size='large'
        data-hashtags='heroku,wywh'
      >
        Tweet
      </a>
    );
  }
});
