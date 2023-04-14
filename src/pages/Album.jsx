import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

class Album extends Component {
  state = {
    artist: '',
    albumName: '',
    slicedAlbumData: [],
    isLoading: false,
    favoriteSongs: [],
  };

  componentDidMount() {
    this.fetchAlbumData();
    this.getFavorites();
  }

  getFavorites = async () => {
    this.setState({ isLoading: true });
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ isLoading: false, favoriteSongs });
  };

  fetchAlbumData = async () => {
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
  };

  render() {
    const { artist, albumName, slicedAlbumData, isLoading, favoriteSongs } = this.state;

    return (
      <div data-testid="page-album">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <Header />
            <p data-testid="album-name">{albumName ? `${albumName}` : ''}</p>
            <p data-testid="artist-name">{artist ? `${artist}` : ''}</p>
            <div>
              {slicedAlbumData
                ? slicedAlbumData.map((element) => (
                  <MusicCard
                    key={ element.trackId }
                    trackName={ element.trackName }
                    previewUrl={ element.previewUrl }
                    trackId={ element.trackId }
                    musicData={ element }
                    favoriteSongs={ favoriteSongs }
                  />
                ))
                : ''}
            </div>
          </>
        )}
      </div>
    );
  }
}

export default Album;

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
