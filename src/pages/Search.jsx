import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import AlbumCard from '../components/AlbumCard';
import './css/Search.css';

class Search extends Component {
  state = {
    searchQuery: '',
    isDisabled: false,
    isSearching: false,
    searched: undefined,
    albumsList: [],
  };

  validateQuery = (value) => {
    const minLength = 2;
    this.setState({
      isDisabled: value.length >= minLength,
    });
  };

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState(
      {
        searchQuery: value,
      },
      () => this.validateQuery(value),
    );
  };

  handleClick = async (e) => {
    e.preventDefault();
    const { searchQuery } = this.state;
    this.setState({
      isSearching: true,
    });
    const albums = await searchAlbumsAPI(searchQuery);
    this.setState({
      searchQuery: '',
      isSearching: false,
      searched: searchQuery,
      albumsList: albums,
    });
  };

  render() {
    const { isDisabled, searchQuery, isSearching, searched, albumsList } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <section className="search__container">
          <h2>Search</h2>
          {isSearching ? (
            <Loading />
          ) : (
            <form action="" className="search__form">
              <input
                type="text"
                data-testid="search-artist-input"
                id="search-artist"
                placeholder="artist's name"
                onChange={ this.handleChange }
                value={ searchQuery }
              />
              <button
                data-testid="search-artist-button"
                disabled={ !isDisabled }
                onClick={ (e) => this.handleClick(e) }
              >
                Search
              </button>
            </form>
          )}
          {searched
            ? (
              <p className="results__parag">
                {`Results of: ${searched}`}
              </p>)
            : null}
          <div
            className={ `results__container ${albumsList.length > 0 ? '' : 'hidden'}` }
          >
            {albumsList.length > 0
              ? (albumsList
                .map((album) => (<AlbumCard
                  album={ album }
                  key={ album.collectionId }
                />)))
              : (<p />)}
          </div>
        </section>
      </div>
    );
  }
}

export default Search;
