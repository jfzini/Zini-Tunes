import React, { Component } from 'react';
import './css/NotFound.css';

class NotFound extends Component {
  render() {
    return (
      <div className="error__container">
        <h2 data-testid="page-not-found" className="error__title">
          404
        </h2>
        <p className="error__subtitle">Not Found</p>
        <p className="error__text">The resource requested could not be found on this server!</p>
      </div>
    );
  }
}

export default NotFound;
