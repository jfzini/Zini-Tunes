import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import './css/Album.css';

class Album extends Component {
  state = {
    artist: '',
    albumName: '',
    albumPicUrl: '',
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
    const albumPicUrl = albumData[0]
      .artworkUrl100
      .replaceAll('100x100bb.jpg', '300x300bb.jpg');
    const slicedAlbumData = albumData.slice(1);
    this.setState({
      artist,
      albumName,
      slicedAlbumData,
      albumPicUrl,
    });
  };

  render() {
    const {
      artist,
      albumName,
      slicedAlbumData,
      isLoading,
      favoriteSongs,
      albumPicUrl,
    } = this.state;

    return (
      <div data-testid="page-album">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <Header />
            <section className="results__container album__container">
              <div className="album__data">
                <img src={ albumPicUrl } alt="" />
                <div>
                  <p
                    data-testid="album-name"
                    className="album__name"
                  >
                    {albumName ? `${albumName}` : ''}
                  </p>
                  <p
                    data-testid="artist-name"
                    className="artist__name"
                  >
                    {artist ? `${artist}` : ''}
                  </p>
                </div>
              </div>
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
            </section>
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
