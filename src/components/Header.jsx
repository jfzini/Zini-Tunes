import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import './css/Header.css'
import logo from '../images/sound-waves.png'

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
        <div className='header__username'>
          {isLoading
            ? <Loading />
            : <div className='header__logo'>
                <img src={logo} alt="logo" />
                <span data-testid="header-user-name">{userName}</span>
              </div>}
        </div>
        <nav className='header__navbar'>
          <Link to="/search" data-testid="link-to-search">Search</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
          <Link to="/profile" data-testid="link-to-profile">Profile</Link>
        </nav>
      </header>
    );
  }
}

export default Header;
