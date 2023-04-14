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
    console.log('entrou');
    const { musicData } = this.props;
    this.setState({
      isFavorite: checked,
      isLoading: true,
    });
    checked && await addSong(musicData);
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
};

export default MusicCard;
