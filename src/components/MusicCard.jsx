import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  state = {
    isFavorite: false,
    isLoading: false,
  };

  componentDidMount() {
    const { favoriteSongs, musicData } = this.props;
    const favoriteSongsIds = favoriteSongs.map(({ trackId }) => trackId);
    if (favoriteSongsIds.includes(musicData.trackId)) {
      this.setState({
        isFavorite: true,
      });
    }
  }

  handleChange = async ({ target: { checked } }) => {
    const { musicData } = this.props;
    this.setState({
      isFavorite: checked,
      isLoading: true,
    });
    if (checked) {
      await addSong(musicData);
    } else {
      await removeSong(musicData);
    }
    const magicNumber = 500;
    setTimeout(() => {
      this.setState({
        isLoading: false,
      });
    }, magicNumber);
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { isLoading, isFavorite } = this.state;
    return (
      <div>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <p>{trackName}</p>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
              .
            </audio>
            <label htmlFor={ trackId }>Favorita</label>
            <input
              type="checkbox"
              name={ trackId }
              id={ trackId }
              data-testid={ `checkbox-music-${trackId}` }
              onChange={ this.handleChange }
              checked={ isFavorite }
            />
          </>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  musicData: PropTypes.shape({
    trackId: PropTypes.number.isRequired,
  }).isRequired,
  favoriteSongs: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default MusicCard;
