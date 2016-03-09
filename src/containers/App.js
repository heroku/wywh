import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Grid } from 'react-bootstrap';

import * as meActionCreators from '../actions/me';
import * as conferenceActionCreators from '../actions/conferences';

import CheckingLogin from '../pages/CheckingLogin';
import Login from '../pages/Login';
import UploadOverlay from '../components/UploadOverlay';
import Header from '../components/layout/Header';

const App = React.createClass({
  componentWillMount() {
    this.props.conferenceActions.fetchAll();
    this.props.meActions.fetch();
  },

  render() {
    const { conference } = this.props;
    if (this.props.auth.isCheckingAuth) {
      return (<CheckingLogin />);
    }

    if (!this.props.auth.isAuthenticated) {
      return (<Login campaign_id={conference.campaign_id} />);
    }

    return (
      <div className='page-wrap'>
        <Header conferenceName={conference && conference.name} logoutAction={this.props.meActions.logout} />
        <Grid>{this.props.children}</Grid>
        <UploadOverlay uploading={this.props.sync.uploading} />
      </div>
    );
  }
});

function mapStateToProps(state, props) {
  return {
    auth: state.auth,
    me: state.me,
    sync: state.sync,
    conference: state.conferences.records.length > 0 && state.conferences.records[0]
  };
}

function mapDispatchToProps(dispatch) {
  return {
    meActions: bindActionCreators(meActionCreators, dispatch),
    conferenceActions: bindActionCreators(conferenceActionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
