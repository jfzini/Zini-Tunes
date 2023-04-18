import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import './css/MusicCard.css';

class MusicCard extends Component {
  state = {
    isFavorite: false,

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
    });
    if (checked) {
      await addSong(musicData);
    } else {
      await removeSong(musicData);
    }
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { isFavorite } = this.state;
    return (
      <div>
        <p className="track-name">{trackName}</p>
        <div className="audio-track">
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
            .
          </audio>
          <label htmlFor={ trackId } className="checkbox__container">
            <input
              type="checkbox"
              name={ trackId }
              id={ trackId }
              data-testid={ `checkbox-music-${trackId}` }
              onChange={ this.handleChange }
              checked={ isFavorite }
            />
            <div className="checkmark">
              <svg viewBox="0 0 256 256">
                <rect fill="none" height="256" width="256" />
                <path
                  d="M224.6,51.9a59.5,59.5,0,0,0-43-19.9,60.5,60.5,0,0,0-44,17.6L128,59.1l-7.5-7.4C97.2,28.3,59.2,26.3,35.9,47.4a59.9,59.9,0,0,0-2.3,87l83.1,83.1a15.9,15.9,0,0,0,22.6,0l81-81C243.7,113.2,245.6,75.2,224.6,51.9Z"
                  strokeWidth="20px"
                  stroke="#FFF"
                  fill="none"
                />
              </svg>
            </div>
          </label>
        </div>
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
