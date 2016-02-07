import React from 'react';

export default React.createClass({
  render() {
    const { conferenceName } = this.props;
    return (
      <header className='Header'>
        <div className='Header__subheader'>
          <span>
            WYWH
          </span>
          {conferenceName &&
            <span className='Header__subheader__conference'>
              {' / '}{conferenceName}
            </span>
          }
        </div>
      </header>
    );
  }
});
