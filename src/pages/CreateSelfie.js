import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as photoBoothActionCreators from '../actions/photoBooth';
import * as photoActionCreators from '../actions/photos';
import * as conferenceActionCreators from '../actions/conferences';

import ImageCapture from '../components/ImageCapture';
import OverlayEditor from '../components/OverlayEditor';
import FlairPicker from '../components/FlairPicker';
import UploadBar from '../components/UploadBar';

import { Row, Col } from 'react-bootstrap';

const CreateSelfie = React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },

  componentWillMount() {
    this.props.fetchConferences();
    this.props.photoBoothActions.clearPhoto();
  },

  uploadPhoto() {
    // TODO: fix redirect?
    this.props.photoActions.rasterizeAndUpload(this.props.params.conferenceId)
      .then((action) => {
        const photo = action.payload;
        this.context.router.push(
          `/conferences/${photo.conference_id}/photos/${photo.id}`
        );
      });
  },

  render() {
    const { conference, photoBooth, photoBoothActions } = this.props;

    return (
      <Row>
        <Col sm={8} lg={6} lgOffset={photoBooth.image ? 1 : 3} className='CreateSelfie__picture-column'>
          {!photoBooth.image &&
            <ImageCapture handleImage={photoBoothActions.updatePhoto} />
          }

          {photoBooth.image &&
            <OverlayEditor
              image={photoBooth.image}
              overlays={photoBooth.overlays}
              conferenceOverlay={conference.overlay_url}
              onMoveOverlay={photoBoothActions.updateOverlay}
              onAddOverlay={photoBoothActions.addOverlay}
              onRemoveOverlay={photoBoothActions.removeOverlay}
            />
          }
        </Col>
        {photoBooth.image &&
          <Col sm={4} lg={4}>
            <FlairPicker onAddOverlay={photoBoothActions.addOverlay} />
          </Col>
        }
        {photoBooth.image &&
          <Col xs={12} lg={10} lgOffset={1}>
            <UploadBar onClick={this.uploadPhoto} />
          </Col>
        }
      </Row>
    );
  }
});

function mapStateToProps(state, props) {
  return {
    photoBooth: state.photoBooth,
    sync: state.sync,
    conference: state.conferences.records.find((c) => c.id === props.params.conferenceId)
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    photoBoothActions: bindActionCreators(photoBoothActionCreators, dispatch),
    photoActions: bindActionCreators(photoActionCreators, dispatch),
    fetchConferences: () => dispatch(conferenceActionCreators.fetchAll())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateSelfie);
