import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as meActionCreators from '../actions/me';

import { Grid, Row, Col } from 'react-bootstrap';
import ReactEmoji from 'react-emoji';
import Header from '../components/layout/Header';

const Login = React.createClass({
  render() {
    return (
      <div>
        <Header hideLogout />
        <Grid id='Login'>
          <Row className='banner'>
            <Col className='text-center'>
              <h4><strong>DEMO</strong></h4>
              <h1><strong>#WYWH</strong>: Wish You Were Here</h1>
              <div className='homepage-badges text-center'>
                <img src={require('../images/icon-gold.svg')}/>
                <img src={require('../images/icon-silver.svg')}/>
                <img src={require('../images/icon-bronze.svg')}/>
              </div>
              <p>{ReactEmoji.emojify('Send postcards, made with :heart: (by you), from your favorite conferences.')}</p>
              <div><button className='btn btn-primary btn-login' onClick={this.props.meActions.login}>Log in to Heroku</button></div>
            </Col>
          </Row>
          <Row>
            <Col md={6} xs={12}>
              <img src={require('../images/icon-gold.svg')} className='deploy-image' />
              <h2>Deploy</h2>
              {ReactEmoji.emojify(':point_up: Deploy this on Heroku and you could qualify for awesome prizes.')}
            </Col>
            <Col md={6} xs={12}>
              <a className='no-underline' href='https://wywh.io'><h3>Find Out More</h3></a>
              <a href='https://wywh.io'>See instructions</a> for more information
            </Col>
          </Row>
        </Grid>
      </div>
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
