import React from 'react';
import Header from '../components/layout/Header';

import { Grid, Row, Col } from 'react-bootstrap';

export default React.createClass({
  render() {
    return (
      <div>
        <Header hideLogout />
        <Grid>
          <Row>
            <Col className='text-center'>
              <h1>Checking if you are logged in...</h1>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
});
