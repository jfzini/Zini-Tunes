import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const test = await getMusics(id);
    console.log(test);
  }

  render() {

    const {
      location: {
        state: {
          name,
        },
      },
    } = this.props;

    return (
      <div data-testid="page-album">
        <Header />
        <p>
          {name ? `Álbum de ${name}` : ""}
        </p>
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
