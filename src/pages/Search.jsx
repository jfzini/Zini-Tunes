import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import AlbumCard from '../components/AlbumCard';

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
    console.log(albums);
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
        <h2>Search</h2>
        {isSearching ? (
          <Loading />
        ) : (
          <form action="">
            <input
              type="text"
              data-testid="search-artist-input"
              id="search-artist"
              placeholder="Nome do artista"
              onChange={ this.handleChange }
              value={ searchQuery }
            />
            <button
              data-testid="search-artist-button"
              disabled={ !isDisabled }
              onClick={ (e) => this.handleClick(e) }
            >
              Pesquisar
            </button>
          </form>
        )}
        {searched
          ? (
            <p>
              {`Resultado de álbuns de: ${searched}`}
            </p>)
          : null}
        {albumsList.length > 0
          ? (albumsList
            .map((album) => <AlbumCard album={ album } key={ album.collectionId } />))
          : (<p>Nenhum álbum foi encontrado</p>)}
      </div>
    );
  }
}

export default Search;
