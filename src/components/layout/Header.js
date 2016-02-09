import React from 'react';

export default React.createClass({
  render() {
    const { conferenceName, logoutAction } = this.props;
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
        <div className='Header__logout'>
          <button onClick={logoutAction} className='btn btn-primary'>Logout</button>
        </div>
      </header>
    );
  }
});
