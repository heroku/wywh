import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as meActionCreators from '../actions/me';
import * as conferenceActionCreators from '../actions/conferences';

import CheckingLogin from '../pages/CheckingLogin';
import Login from '../pages/Login';
import UploadOverlay from '../components/UploadOverlay';
import Header from '../components/layout/Header';

const App = React.createClass({
  componentWillMount() {
    this.props.meActions.fetch();
    if (this.props.params.conferenceId && !this.props.conference) {
      this.props.conferenceActions.fetchAll();
    }
  },

  render() {
    if (this.props.auth.isCheckingAuth) {
      return (<CheckingLogin />);
    }

    if (!this.props.auth.isAuthenticated) {
      return (<Login />);
    }

    const { conference } = this.props;

    return (
      <div className='page-wrap'>
        <Header conferenceName={conference && conference.name} logoutAction={this.props.meActions.logout} />
        {this.props.children}
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
    conference: props.params.conferenceId && state.conferences.records.find((c) => c.id === props.params.conferenceId)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    meActions: bindActionCreators(meActionCreators, dispatch),
    conferenceActions: bindActionCreators(conferenceActionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
