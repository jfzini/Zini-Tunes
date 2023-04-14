import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  state = {
    userName: '',
    isLoading: true,
  };

  async componentDidMount() {
    const userData = await this.fetchUserData();
    const { name } = userData;
    this.setState({
      userName: name,
      isLoading: false,
    });
  }

  fetchUserData = async () => {
    const fetchUser = await getUser();
    return fetchUser;
  };

  render() {
    const { userName, isLoading } = this.state;

    return (
      <header data-testid="header-component">
        {isLoading
          ? <Loading />
          : <span data-testid="header-user-name">{`Olá, ${userName}`}</span>}
        <Link to="/search" data-testid="link-to-search">Search</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
        <Link to="/profile" data-testid="link-to-profile">Profile</Link>
      </header>
    );
  }
}

export default Header;
