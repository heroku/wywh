import React from 'react';
import { connect } from 'react-redux';

import * as conferenceActions from '../actions/conferences';

import { Row, Col } from 'react-bootstrap';
import ConferenceList from '../components/ConferenceList';

const Conferences = React.createClass({
  componentWillMount() {
    this.props.fetchConferences();
  },

  render() {
    return (
      <Row>
        <Col md={6} mdOffset={3}>
          <div className='panel panel-primary u-margin-Txl'>
            <div className='panel-heading'>
              <h2 className='panel-title'>Select a conference</h2>
            </div>
            <ConferenceList conferences={this.props.conferences} />
          </div>
        </Col>
      </Row>
    );
  }
});

function mapStateToProps(state) {
  return {
    conferences: state.conferences.records
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchConferences: () => dispatch(conferenceActions.fetchAll())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Conferences);
