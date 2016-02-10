import React from 'react';

import { Row, Panel, Col, Grid } from 'react-bootstrap';

export default React.createClass({
  render() {
    return (
      <Grid className='page-wrap panel-page--container'>
        <Row>
          <Col md={6} mdOffset={3}>
            <Panel header={<h1>{this.props.header}</h1>}>
              {this.props.children}
            </Panel>
          </Col>
        </Row>
      </Grid>
    );
  }
});
