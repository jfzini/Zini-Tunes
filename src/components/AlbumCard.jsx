import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class AlbumCard extends Component {
  render() {
    const {
      album: {
        artistName,
        collectionId,
        collectionName,
        collectionPrice,
        artworkUrl100,
      },
    } = this.props;

    return (
      <div key={ collectionId }>
        <img src={ artworkUrl100 } alt={ collectionName } />
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          {collectionName}
        </Link>
        <p>{artistName}</p>
        <p>{collectionPrice}</p>
      </div>
    );
  }
}

export default AlbumCard;

AlbumCard.propTypes = {
  album: PropTypes.shape({
    artistId: PropTypes.number,
    artistName: PropTypes.string.isRequired,
    collectionId: PropTypes.number.isRequired,
    collectionName: PropTypes.string.isRequired,
    collectionPrice: PropTypes.number.isRequired,
    artworkUrl100: PropTypes.string.isRequired,
    releaseDate: PropTypes.string,
    trackCount: PropTypes.number,
  }),
};

AlbumCard.defaultProps = {
  album: PropTypes.shape({
    artistId: null,
    releaseDate: null,
    trackCount: null,
  }),
};
