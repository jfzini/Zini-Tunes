import React, { Component } from 'react';
import { ScaleLoader } from 'react-spinners';

class Loading extends Component {
  render() {
    return (
      <ScaleLoader color="#36d7b7" />
    );
  }
}

export default Loading;
