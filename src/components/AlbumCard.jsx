import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './css/AlbumCard.css';

class AlbumCard extends Component {
  render() {
    const {
      album: { artistName, collectionId, collectionName, collectionPrice, artworkUrl100 },
    } = this.props;
    const slicedAlbumName = 
      collectionName.length >= 25
        ? `${collectionName.slice(0, 25)}...`
        : collectionName
    const slicedArtistName = 
      artistName.length >= 40
        ? `${artistName.slice(0, 40)}...`
        : artistName

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
            <img src={ artworkUrl100.replaceAll('100x100bb', '200x200bb') } alt={ collectionName } />
            <div className='play__container'>
              <div class="play-triangle"></div>
            </div>
          </Link>
        </div>
        <div className='album-info__container'>
          <Link
            to={ {
              pathname: `/album/${collectionId}`,
              state: { name: artistName },
            } }
            data-testid={ `link-to-album-${collectionId}` }
          >
            {slicedAlbumName}
          </Link>
          <p className='album-artist'>{slicedArtistName}</p>
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
