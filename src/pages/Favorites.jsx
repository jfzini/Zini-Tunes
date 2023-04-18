import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import './css/Favorites.css'

class Favorites extends Component {
  state = {
    loading: false,
    favoriteSongs: [],
  };

  componentDidMount() {
    this.renderFavoriteSongs();
  }

  async componentDidUpdate() {
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      favoriteSongs,
    });
  }

  renderFavoriteSongs = async () => {
    this.setState({
      loading: true,
    });
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      loading: false,
      favoriteSongs,
    });
  };

  render() {
    const { loading, favoriteSongs } = this.state;

    return (
      <div data-testid="page-favorites">
        <Header />
        <section className="results__container album__container">
          <h2 className='favorites__title'>Favorite Songs</h2>
          {loading
            ? (<Loading />)
            : (favoriteSongs.map((song) => (
              <MusicCard
                key={ song.trackId }
                trackName={ song.trackName }
                previewUrl={ song.previewUrl }
                trackId={ song.trackId }
                musicData={ song }
                favoriteSongs={ favoriteSongs }
              />
            )))}
        </section>
      </div>
    );
  }
}

export default Favorites;
