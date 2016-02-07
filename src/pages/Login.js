import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as meActionCreators from '../actions/me';

import PanelPage from '../containers/PanelPage';
import { Button } from 'react-bootstrap';

const Login = React.createClass({
  render() {
    return (
      <PanelPage header='Heroku SelfieMatic'>
        <h2>To upload photos you have to be logged in</h2>

        <Button bsStyle='primary' onClick={this.props.meActions.login}>
          Login with Heroku
        </Button>
      </PanelPage>
    );
  }
});

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    meActions: bindActionCreators(meActionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
