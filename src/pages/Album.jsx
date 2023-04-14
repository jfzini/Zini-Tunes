import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  state = {
    artist: '',
    albumName: '',
    slicedAlbumData: [],
  };

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const albumData = await getMusics(id);
    const artist = albumData[0].artistName;
    const albumName = albumData[0].collectionName;
    const slicedAlbumData = albumData.slice(1);
    this.setState({
      artist,
      albumName,
      slicedAlbumData,
    });
  }

  render() {
    const { artist, albumName, slicedAlbumData } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        <p data-testid="album-name">{albumName ? `${albumName}` : ''}</p>
        <p data-testid="artist-name">
          {artist ? `${artist}` : ''}
        </p>
        <div>
          {slicedAlbumData
            ? slicedAlbumData
              .map(({ trackName, previewUrl, trackId }) => (
                <MusicCard
                  key={ trackId }
                  trackName={ trackName }
                  previewUrl={ previewUrl }
                />
              ))
            : ''}
        </div>
      </div>
    );
  }
}

export default Album;

Album.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool.isRequired,
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    hash: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
    state: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
