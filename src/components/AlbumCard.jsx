import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './css/AlbumCard.css';

class AlbumCard extends Component {
  render() {
    const {
      album: {
        artistName,
        collectionId,
        collectionName,
        artworkUrl100,
      },
    } = this.props;
    const albumNameLimit = 25;
    const artistsNamesLimit = 40;
    const slicedAlbumName = collectionName.length >= albumNameLimit
      ? `${collectionName.slice(0, albumNameLimit)}...`
      : collectionName;
    const slicedArtistName = artistName.length >= artistsNamesLimit
      ? `${artistName.slice(0, artistsNamesLimit)}...`
      : artistName;

    return (
      <div key={ collectionId } className="album-card__container">
        <div className="album-image__container">
          <Link
            to={ {
              pathname: `/album/${collectionId}`,
              state: { name: artistName },
            } }
            data-testid={ `link-to-album-${collectionId}` }
          >
            <img
              src={ artworkUrl100.replaceAll('100x100bb', '200x200bb') }
              alt={ collectionName }
            />
            <div className="play__container">
              <div className="play-triangle" />
            </div>
          </Link>
        </div>
        <div className="album-info__container">
          <Link
            to={ {
              pathname: `/album/${collectionId}`,
              state: { name: artistName },
            } }
            data-testid={ `link-to-album-${collectionId}` }
          >
            {slicedAlbumName}
          </Link>
          <p className="album-artist">{slicedArtistName}</p>
        </div>
      </div>
    );
  }
}

export default AlbumCard;

AlbumCard.propTypes = {
  album: PropTypes.shape({
    artistName: PropTypes.string.isRequired,
    collectionId: PropTypes.number.isRequired,
    collectionName: PropTypes.string.isRequired,
    collectionPrice: PropTypes.number,
    artworkUrl100: PropTypes.string.isRequired,
  }),
};

AlbumCard.defaultProps = {
  album: PropTypes.shape({
    collectionPrice: 0.0,
  }),
};
