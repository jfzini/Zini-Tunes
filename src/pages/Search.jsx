import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    searchQuery: '',
    isDisabled: false,
  };

  validateQuery = (value) => {
    const minLength = 2;
    this.setState({
      isDisabled: value.length >= minLength,
    });
  };

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({
      searchQuery: value,
    }, () => this.validateQuery(value));
  };

  render() {
    const { isDisabled, searchQuery } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <h2>Search</h2>
        <form action="">
          <input
            type="text"
            data-testid="search-artist-input"
            id="search-artist"
            placeholder="Nome do artista"
            onChange={ this.handleChange }
            value={ searchQuery }
          />
          <button data-testid="search-artist-button" disabled={ !isDisabled }>
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
