import React from 'react';

import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';
import TwitterShareButton from './TwitterShareButton';
import DownloadImageButton from './DownloadImageButton';
import CopyableLink from './CopyableLink';
import ReactEmoji from 'react-emoji';

export default React.createClass({
  getDeployEnv() {
    const host = window.location.host;
    if (host.match(/herokuapp.com/) && !host.match(/wywh-www.herokuapp.com/)) {
      return 'heroku';
    } else if (host.match(/localhost/)) {
      return 'localhost';
    } else if (host.match(/demo.wywh.io/) && host.match(/wywh-demo.herokuapp.com/)) {
      return 'demo';
    }
    return 'unknown';
  },
  render() {
    let step3;
    if (this.getDeployEnv() === 'heroku') {
      step3 = (
        <div>
          <h4>{ReactEmoji.emojify('3. Get a :raised_hand: from the Heroku booth')}</h4>
          <p>Congratulations on deploying #wywh to Heroku. You are now eligible for swag and a chance to win a prize.</p>
        </div>
      );
    } else if (this.getDeployEnv() === 'localhost') {
      step3 = (
        <div>
          <h4>{ReactEmoji.emojify('3. Get a :raised_hand: from the Heroku booth')}</h4>
          <p>Congratulations on running #wywh locally. You are now eligible for swag.</p>
          <p>Deploy to heroku for a chance of winning a prize.</p>
          <Button href='https://wywh.io/' bsStyle='primary'>Learn how to deploy!</Button>
        </div>
      );
    } else {
      step3 = (
        <div>
          <h4>3. Deploy!</h4>
          <p>Deploy to heroku for a chance of winning great swag.</p>
          <Button href='https://wywh.io/' bsStyle='primary'>Learn how to deploy!</Button>
        </div>
      );
    }
    return (
      <div className='ShareList'>
        <h4>1. Share</h4>
        <TwitterShareButton shareUrl={this.props.shareUrl} shareText={this.props.shareText} /><br/>
        <DownloadImageButton href={this.props.imageUrl} /><br/>
        <CopyableLink link={this.props.shareUrl} />
        <h4>2. Keep shooting</h4>
        <LinkContainer to={`/`}>
          <Button bsStyle='primary'>Take another!</Button>
        </LinkContainer>
        {step3}
      </div>
    );
  }
});
