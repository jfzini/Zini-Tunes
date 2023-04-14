import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AlbumCard extends Component {
  render() {

    const {collectionId, collectionName} = this.props;

    return (
      <div>
        {collectionId}
        <Link to={`/album/${collectionId}`} data-testid={`link-to-album-${collectionId}`}>
          {collectionName}
        </Link>
      </div>
    );
  }
}

export default AlbumCard;
