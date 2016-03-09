import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router';

export default React.createClass({
  render() {
    const { conferences } = this.props;

    return (
      <ListGroup className='u-margin-Bn'>
        {conferences.map((conference) => (
          <Link
            key={conference.id}
            to={`/conferences/${conference.id}/selfie`}
            className='list-group-item clearfix u-padding-Am'
          >
            <span className='pull-right'>
              <Button bsStyle='primary' pullRight>Select</Button>
            </span>
            <h4 className='u-padding-An u-margin-An'>
              {conference.name}
            </h4>
          </Link>
        ))}
      </ListGroup>
    );
  }
});
