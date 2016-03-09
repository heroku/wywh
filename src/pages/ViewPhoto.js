import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as photoActionCreators from '../actions/photos';

import { Row, Col } from 'react-bootstrap';
import PhotoFrame from '../components/PhotoFrame';
import ShareList from '../components/ShareList';

const ViewPhoto = React.createClass({
  componentWillMount() {
    if (!this.props.photo) {
      this.props.photoActions.fetch(this.props.params.photoId);
    }
  },

  render() {
    const { photo } = this.props;

    if (!photo) {
      return (<h1>Loading...</h1>);
    }

    return (
      <Row>
        <Col md={8} lg={6} lgOffset={1}>
          <PhotoFrame>
            {photo &&
              <img src={photo.image_url} style={{ maxWidth: '100%', width: '100%' }}/>
            }
          </PhotoFrame>
        </Col>
        <Col md={4}>
          <ShareList
            conferenceId={photo.conference_id}
            shareUrl={photo.short_url}
            imageUrl={photo.image_url}
            shareText={photo.conference.tweet_body || 'Greetings from #Fluent - wish you were here!'}
            isDeployed={photo.referer.match(/herokuapp.com/)}
          />
        </Col>
      </Row>
    );
  }
});

function mapStateToProps(state, props) {
  return {
    photo: state.photos[props.params.photoId]
  };
}

function mapDispatchToProps(dispatch) {
  return {
    photoActions: bindActionCreators(photoActionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewPhoto);
