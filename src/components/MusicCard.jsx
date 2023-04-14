import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  state = {
    isFavorite: false,
    isLoading: false,
  };

  handleChange = async ({ target: { checked } }) => {
    const { musicData } = this.props;
    this.setState({
      isFavorite: checked,
      isLoading: true,
    });
    if (checked) {
      await addSong(musicData);
    }
    this.setState({
      isLoading: false,
    });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { isLoading, isFavorite } = this.state;
    return (
      <div>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label htmlFor="checkbox-favorite">Favorita</label>
        <input
          type="checkbox"
          name="checkbox-favorite"
          id="checkbox-favorite"
          data-testid={ `checkbox-music-${trackId}` }
          onChange={ this.handleChange }
          checked={ isFavorite }
        />
        {isLoading && <Loading />}
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  musicData: PropTypes.shape({
    artistId: PropTypes.number.isRequired,
    artistName: PropTypes.string.isRequired,
    artistViewUrl: PropTypes.string.isRequired,
    artworkUrl100: PropTypes.string.isRequired,
    artworkUrl30: PropTypes.string.isRequired,
    artworkUrl60: PropTypes.string.isRequired,
    collectionArtistId: PropTypes.number.isRequired,
    collectionArtistName: PropTypes.string.isRequired,
    collectionArtistViewUrl: PropTypes.string.isRequired,
    collectionCensoredName: PropTypes.string.isRequired,
    collectionExplicitness: PropTypes.string.isRequired,
    collectionId: PropTypes.number.isRequired,
    collectionName: PropTypes.string.isRequired,
    collectionPrice: PropTypes.number.isRequired,
    collectionViewUrl: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    discCount: PropTypes.number.isRequired,
    discNumber: PropTypes.number.isRequired,
    isStreamable: PropTypes.bool.isRequired,
    kind: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    primaryGenreName: PropTypes.string.isRequired,
    releaseDate: PropTypes.string.isRequired,
    trackCensoredName: PropTypes.string.isRequired,
    trackCount: PropTypes.number.isRequired,
    trackExplicitness: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
    trackName: PropTypes.string.isRequired,
    trackNumber: PropTypes.number.isRequired,
    trackPrice: PropTypes.number.isRequired,
    trackTimeMillis: PropTypes.number.isRequired,
    trackViewUrl: PropTypes.string.isRequired,
    wrapperType: PropTypes.string.isRequired,
  }).isRequired,
};

export default MusicCard;
