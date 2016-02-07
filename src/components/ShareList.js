import React from 'react';

import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';
import TwitterShareButton from './TwitterShareButton';
import DownloadImageButton from './DownloadImageButton';
import CopyableLink from './CopyableLink';

export default React.createClass({
  render() {
    return (
      <div className='ShareList'>
        <h4>1. Share</h4>
        <TwitterShareButton shareUrl={this.props.shareUrl} shareText={this.props.shareText} /><br/>
        <DownloadImageButton href={this.props.imageUrl} /><br/>
        <CopyableLink link={this.props.shareUrl} />

        <h4>2. Keep shooting</h4>
        <LinkContainer to={`/conferences/${this.props.conferenceId}/selfie`}>
          <Button bsStyle='primary'>Take another!</Button>
        </LinkContainer>

        {!this.props.isDeployed &&
          <div>
            <h4>3. Deploy!</h4>
            <p>Deploy to heroku to get more flair, and a chance of winning great swag.</p>
            <Button bsStyle='primary'>Learn how to deploy!</Button>
          </div>
        }

      </div>
    );
  }
});
